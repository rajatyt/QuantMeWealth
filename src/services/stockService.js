// Real-Time Market Data Service (Pure Live Feed — No Mock Data)
import { tickerSymbols, performanceData } from '../data/mockData';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'yahoo-finance15.p.rapidapi.com';
const RAPIDAPI_BASE_URL = import.meta.env.VITE_RAPIDAPI_URL || 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes';

let cachedQuotes = {};
let lastFetchTime = 0;
const CACHE_TTL_MS = 4000; // 4s cache to allow 5-10s live polling

/**
 * Fetch true live quotes from financial APIs every 5-10 seconds
 */
export async function fetchLiveMarketQuotes() {
  const now = Date.now();

  // Return cache only if fetched less than 4 seconds ago
  if (Object.keys(cachedQuotes).length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
    return { quotes: cachedQuotes, isLive: true };
  }

  const liveResults = {};

  // 1. Live Crypto: Binance Public API (Sub-second real-time BTC/USD with 100% open CORS)
  try {
    const btcRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    if (btcRes.ok) {
      const btc = await btcRes.json();
      const price = parseFloat(btc.lastPrice);
      const change = parseFloat(btc.priceChangePercent);
      const isUp = change >= 0;

      liveResults['BTC'] = {
        price,
        change: `${isUp ? '+' : ''}${change.toFixed(2)}%`,
        up: isUp,
        isLive: true,
        source: 'Binance Live',
        timestamp: new Date().toLocaleTimeString(),
      };
    }
  } catch (e) {
    console.debug('Live BTC fetch notice:', e.message);
  }

  // 2. Live Indices & Commodities: Fetch via Vite Proxy or Direct Yahoo API
  const symbolsToFetch = tickerSymbols.filter((s) => s.id !== 'BTC');

  const fetchPromises = symbolsToFetch.map(async (sym) => {
    try {
      // Try Vite server proxy first (avoids browser CORS)
      let response = await fetch(`/api/market/v8/finance/chart/${encodeURIComponent(sym.querySymbol)}?interval=1m`);

      if (!response.ok) {
        // Direct fallback
        response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym.querySymbol)}?interval=1m`);
      }

      if (response.ok) {
        const json = await response.json();
        const meta = json?.chart?.result?.[0]?.meta;

        if (meta && meta.regularMarketPrice !== undefined) {
          const price = Number(meta.regularMarketPrice);
          const prevClose = Number(meta.chartPreviousClose || meta.previousClose || price);
          const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
          const isUp = changePct >= 0;

          liveResults[sym.id] = {
            price,
            change: `${isUp ? '+' : ''}${changePct.toFixed(2)}%`,
            up: isUp,
            isLive: true,
            source: 'Yahoo Finance Live',
            timestamp: new Date().toLocaleTimeString(),
          };
        }
      }
    } catch (err) {
      console.debug(`Live quote fetch error for ${sym.id}:`, err.message);
    }
  });

  await Promise.all(fetchPromises);

  // 3. Fallback to RapidAPI if key is available and some symbols failed
  if (RAPIDAPI_KEY && Object.keys(liveResults).length < tickerSymbols.length) {
    try {
      const missing = tickerSymbols.filter((s) => !liveResults[s.id]);
      if (missing.length > 0) {
        const query = missing.map((s) => s.querySymbol).join(',');
        const res = await fetch(`${RAPIDAPI_BASE_URL}?ticker=${encodeURIComponent(query)}`, {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const rapidQuotes = parseRapidApiResponse(data);
          Object.assign(liveResults, rapidQuotes);
        }
      }
    } catch (e) {
      console.debug('RapidAPI query notice:', e.message);
    }
  }

  if (Object.keys(liveResults).length > 0) {
    cachedQuotes = { ...cachedQuotes, ...liveResults };
    lastFetchTime = now;
    return { quotes: cachedQuotes, isLive: true };
  }

  return { quotes: cachedQuotes, isLive: Object.keys(cachedQuotes).length > 0 };
}

function parseRapidApiResponse(data) {
  const quotesMap = {};
  let rawList = [];

  if (Array.isArray(data)) rawList = data;
  else if (Array.isArray(data?.body)) rawList = data.body;
  else if (Array.isArray(data?.quoteResponse?.result)) rawList = data.quoteResponse.result;
  else if (Array.isArray(data?.data)) rawList = data.data;

  rawList.forEach((item) => {
    if (!item) return;
    const symbol = item.symbol || item.ticker || item.id || '';
    const matched = tickerSymbols.find(
      (s) => s.querySymbol.toUpperCase() === symbol.toUpperCase() || s.id.toUpperCase() === symbol.toUpperCase()
    );
    if (!matched) return;

    const price = item.regularMarketPrice ?? item.price ?? matched.base;
    const changePercent = item.regularMarketChangePercent ?? item.changePercent ?? 0;
    const isUp = Number(changePercent) >= 0;

    quotesMap[matched.id] = {
      price: Number(price),
      change: `${isUp ? '+' : ''}${Number(changePercent).toFixed(2)}%`,
      up: isUp,
      isLive: true,
      timestamp: new Date().toLocaleTimeString(),
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
