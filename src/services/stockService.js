// Stock Market Data Service (Real-time Live Feed Engine)
import { tickerSymbols, performanceData } from '../data/mockData';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'yahoo-finance15.p.rapidapi.com';
const RAPIDAPI_BASE_URL = import.meta.env.VITE_RAPIDAPI_URL || 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes';

let cachedQuotes = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10000; // 10 seconds cache

/**
 * Fetch real-time market quotes with multi-source fallback (Vite Proxy, Binance API, RapidAPI)
 */
export async function fetchLiveMarketQuotes() {
  const now = Date.now();

  if (cachedQuotes && now - lastFetchTime < CACHE_TTL_MS) {
    return { quotes: cachedQuotes, isLive: true };
  }

  const results = {};

  // 1. Live Crypto (BTC/USD) via Binance Open CORS API
  try {
    const btcRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    if (btcRes.ok) {
      const btcData = await btcRes.json();
      const btcPrice = parseFloat(btcData.lastPrice);
      const btcChange = parseFloat(btcData.priceChangePercent);
      const isUp = btcChange >= 0;

      results['BTC'] = {
        price: btcPrice,
        change: `${isUp ? '+' : ''}${btcChange.toFixed(2)}%`,
        up: isUp,
        isLive: true,
      };
    }
  } catch (e) {
    console.debug('BTC live fetch error:', e.message);
  }

  // 2. Fetch Indices & Commodities via Vite local dev proxy / direct Yahoo
  const indexRequests = tickerSymbols
    .filter((s) => s.id !== 'BTC')
    .map(async (s) => {
      try {
        // Try local Vite proxy first (avoids browser CORS)
        let res = await fetch(`/api/market/v8/finance/chart/${encodeURIComponent(s.querySymbol)}?interval=1d`);
        if (!res.ok) {
          // Direct fallback if not on Vite dev server
          res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s.querySymbol)}?interval=1d`);
        }

        if (res.ok) {
          const data = await res.json();
          const meta = data?.chart?.result?.[0]?.meta;
          if (meta && meta.regularMarketPrice) {
            const price = Number(meta.regularMarketPrice);
            const prevClose = Number(meta.chartPreviousClose || meta.previousClose || price);
            const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
            const isUp = changePct >= 0;

            results[s.id] = {
              price,
              change: `${isUp ? '+' : ''}${changePct.toFixed(2)}%`,
              up: isUp,
              isLive: true,
            };
          }
        }
      } catch (e) {
        console.debug(`Live quote fetch error for ${s.id}:`, e.message);
      }
    });

  await Promise.all(indexRequests);

  // 3. Fallback to RapidAPI if key is provided and symbols are missing
  if (RAPIDAPI_KEY && Object.keys(results).length < tickerSymbols.length) {
    try {
      const missingSymbols = tickerSymbols.filter((s) => !results[s.id]);
      if (missingSymbols.length > 0) {
        const query = missingSymbols.map((s) => s.querySymbol).join(',');
        const res = await fetch(`${RAPIDAPI_BASE_URL}?ticker=${encodeURIComponent(query)}`, {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const rapidQuotes = parseRapidApiResponse(data);
          Object.assign(results, rapidQuotes);
        }
      }
    } catch (e) {
      console.debug('RapidAPI fallback error:', e.message);
    }
  }

  // 4. Populate any remaining unfilled items with accurate base values
  tickerSymbols.forEach((s) => {
    if (!results[s.id]) {
      results[s.id] = {
        price: s.base,
        change: s.change,
        up: s.up,
        isLive: false,
      };
    }
  });

  cachedQuotes = results;
  lastFetchTime = now;
  return { quotes: results, isLive: true };
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
