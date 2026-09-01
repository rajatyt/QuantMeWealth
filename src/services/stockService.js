// Stock Market Data Service (Real-time Live Market Feed + RapidAPI Support)
import { tickerSymbols, performanceData } from '../data/mockData';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'yahoo-finance15.p.rapidapi.com';
const RAPIDAPI_BASE_URL = import.meta.env.VITE_RAPIDAPI_URL || 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes';

let cachedQuotes = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15000; // Cache for 15 seconds to prevent rate-limiting

/**
 * Fetch real-time quotes using RapidAPI or Direct Market Feed
 */
export async function fetchLiveMarketQuotes() {
  const now = Date.now();

  // Return cached quotes if within TTL
  if (cachedQuotes && now - lastFetchTime < CACHE_TTL_MS) {
    return { quotes: cachedQuotes, isLive: true };
  }

  // 1. Try RapidAPI if key is provided
  if (RAPIDAPI_KEY) {
    try {
      const tickersParam = tickerSymbols.map((s) => s.querySymbol).join(',');
      const url = `${RAPIDAPI_BASE_URL}?ticker=${encodeURIComponent(tickersParam)}`;

      const res = await fetch(url, {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = parseRapidApiResponse(data);
        if (parsed && Object.keys(parsed).length > 0) {
          cachedQuotes = parsed;
          lastFetchTime = now;
          return { quotes: parsed, isLive: true };
        }
      }
    } catch (e) {
      console.warn('RapidAPI fetch failed, falling back to direct live feed:', e);
    }
  }

  // 2. Direct Real-Time Live Feed for Indian & Global Markets
  try {
    const liveQuotes = await fetchDirectLiveQuotes();
    if (liveQuotes && Object.keys(liveQuotes).length > 0) {
      cachedQuotes = liveQuotes;
      lastFetchTime = now;
      return { quotes: liveQuotes, isLive: true };
    }
  } catch (e) {
    console.error('Direct live market feed error:', e);
  }

  return { quotes: cachedQuotes, isLive: Boolean(cachedQuotes) };
}

/**
 * Fetch direct real-time quotes for Nifty, BankNifty, S&P, Crypto, Commodities
 */
async function fetchDirectLiveQuotes() {
  const quotesMap = {};

  const requests = tickerSymbols.map(async (s) => {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s.querySymbol)}?interval=1d`;
      const res = await fetch(url);
      if (!res.ok) return;

      const data = await res.json();
      const meta = data?.chart?.result?.[0]?.meta;
      if (!meta) return;

      const price = meta.regularMarketPrice ?? s.base;
      const prevClose = meta.chartPreviousClose || meta.previousClose || price;
      const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
      const isUp = changePct >= 0;

      quotesMap[s.id] = {
        price: Number(price),
        change: `${isUp ? '+' : ''}${changePct.toFixed(2)}%`,
        up: isUp,
        isLive: true,
        lastUpdated: new Date().toLocaleTimeString(),
      };
    } catch {
      // Individual quote failure falls back to default
    }
  });

  await Promise.all(requests);
  return quotesMap;
}

/**
 * Parse RapidAPI response shapes
 */
function parseRapidApiResponse(data) {
  const quotesMap = {};
  let rawList = [];

  if (Array.isArray(data)) rawList = data;
  else if (Array.isArray(data?.body)) rawList = data.body;
  else if (Array.isArray(data?.quoteResponse?.result)) rawList = data.quoteResponse.result;
  else if (Array.isArray(data?.data)) rawList = data.data;
  else if (typeof data === 'object' && data !== null) rawList = Object.values(data);

  rawList.forEach((item) => {
    if (!item) return;
    const symbol = item.symbol || item.ticker || item.id || '';
    const matched = tickerSymbols.find(
      (s) => s.querySymbol.toUpperCase() === symbol.toUpperCase() || s.id.toUpperCase() === symbol.toUpperCase()
    );
    if (!matched) return;

    const price = item.regularMarketPrice ?? item.price ?? item.lastPrice ?? matched.base;
    const changePercent = item.regularMarketChangePercent ?? item.changePercent ?? item.change_percent ?? 0;
    const isUp = Number(changePercent) >= 0;

    quotesMap[matched.id] = {
      price: Number(price),
      change: `${isUp ? '+' : ''}${Number(changePercent).toFixed(2)}%`,
      up: isUp,
      isLive: true,
      lastUpdated: new Date().toLocaleTimeString(),
    };
  });

  return quotesMap;
}

export function getTickerSymbols() {
  return tickerSymbols;
}

export function getPerformanceData(timeframe = '3Y') {
  return performanceData[timeframe] || performanceData['3Y'];
}
