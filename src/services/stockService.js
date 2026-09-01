// Stock Market Data Service (RapidAPI Integration)
import { tickerSymbols, performanceData } from '../data/mockData';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'yahoo-finance15.p.rapidapi.com';
const RAPIDAPI_BASE_URL = import.meta.env.VITE_RAPIDAPI_URL || 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes';

let cachedQuotes = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 25000; // Cache for 25 seconds to respect free-tier rate limits

/**
 * Fetch real-time quotes from RapidAPI
 * Returns a dictionary keyed by symbol id (e.g. { NIFTY: { price, change, up, isLive } })
 */
export async function fetchLiveMarketQuotes() {
  const now = Date.now();

  // Return cached quotes if within TTL
  if (cachedQuotes && now - lastFetchTime < CACHE_TTL_MS) {
    return { quotes: cachedQuotes, isLive: Boolean(RAPIDAPI_KEY) };
  }

  // If no API key is configured, return null to fallback to simulated engine
  if (!RAPIDAPI_KEY) {
    return { quotes: null, isLive: false };
  }

  try {
    const tickersParam = tickerSymbols.map((s) => s.querySymbol).join(',');
    const url = `${RAPIDAPI_BASE_URL}?ticker=${encodeURIComponent(tickersParam)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      console.warn(`RapidAPI request failed with status: ${response.status}`);
      return { quotes: cachedQuotes, isLive: false };
    }

    const data = await response.json();
    const parsedQuotes = parseRapidApiResponse(data);

    if (parsedQuotes && Object.keys(parsedQuotes).length > 0) {
      cachedQuotes = parsedQuotes;
      lastFetchTime = now;
      return { quotes: parsedQuotes, isLive: true };
    }

    return { quotes: cachedQuotes, isLive: false };
  } catch (error) {
    console.error('Error fetching live market data from RapidAPI:', error);
    return { quotes: cachedQuotes, isLive: false };
  }
}

/**
 * Parse various RapidAPI quote response formats
 */
function parseRapidApiResponse(data) {
  const quotesMap = {};

  // Find array of quotes from standard response shapes
  let rawList = [];
  if (Array.isArray(data)) {
    rawList = data;
  } else if (Array.isArray(data?.body)) {
    rawList = data.body;
  } else if (Array.isArray(data?.quoteResponse?.result)) {
    rawList = data.quoteResponse.result;
  } else if (Array.isArray(data?.data)) {
    rawList = data.data;
  } else if (typeof data === 'object' && data !== null) {
    rawList = Object.values(data);
  }

  rawList.forEach((item) => {
    if (!item) return;

    const symbol = item.symbol || item.ticker || item.id || '';
    const matchedConfig = tickerSymbols.find(
      (s) => s.querySymbol.toUpperCase() === symbol.toUpperCase() || s.id.toUpperCase() === symbol.toUpperCase()
    );

    if (!matchedConfig) return;

    const price =
      item.regularMarketPrice ??
      item.price ??
      item.lastPrice ??
      item.close ??
      matchedConfig.base;

    const changePercent =
      item.regularMarketChangePercent ??
      item.changePercent ??
      item.percentChange ??
      item.change_percent ??
      0;

    const isPositive = Number(changePercent) >= 0;
    const formattedChange = `${isPositive ? '+' : ''}${Number(changePercent).toFixed(2)}%`;

    quotesMap[matchedConfig.id] = {
      price: Number(price),
      change: formattedChange,
      up: isPositive,
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
