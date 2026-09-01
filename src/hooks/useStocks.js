import { useState, useEffect, useRef, useCallback } from 'react';
import { tickerSymbols } from '../data/mockData';
import { fetchLiveMarketQuotes } from '../services/stockService';

/**
 * Custom Hook: useStocks
 * Fetches genuine real-time market data every 5-10 seconds.
 * Mock/simulated data logic has been completely removed.
 */
export function useStocks(pollingIntervalMs = 7000) {
  const [prices, setPrices] = useState(() => {
    const init = {};
    tickerSymbols.forEach((s) => {
      init[s.id] = {
        price: s.base,
        change: s.change,
        up: s.up,
        flash: null,
        isLive: false,
      };
    });
    return init;
  });

  const [isLiveApi, setIsLiveApi] = useState(false);
  const timeouts = useRef({});
  const lastPricesRef = useRef({});

  // 1. Fetch live quotes from real market APIs
  const fetchQuotes = useCallback(async () => {
    try {
      const { quotes, isLive } = await fetchLiveMarketQuotes();

      if (quotes && Object.keys(quotes).length > 0) {
        setIsLiveApi(isLive);
        setPrices((prev) => {
          const updated = { ...prev };

          Object.entries(quotes).forEach(([id, quote]) => {
            const oldPrice = lastPricesRef.current[id] ?? prev[id]?.price;
            let flash = null;

            // Trigger green/red flash only when real market price changes
            if (oldPrice !== undefined && quote.price !== oldPrice) {
              flash = quote.price > oldPrice ? 'up' : 'down';

              // Clear flash after 600ms
              if (timeouts.current[id]) clearTimeout(timeouts.current[id]);
              timeouts.current[id] = setTimeout(() => {
                setPrices((p) => ({
                  ...p,
                  [id]: { ...p[id], flash: null },
                }));
              }, 600);
            }

            lastPricesRef.current[id] = quote.price;

            updated[id] = {
              price: quote.price,
              change: quote.change,
              up: quote.up,
              flash: flash ?? prev[id]?.flash,
              isLive: true,
            };
          });

          return updated;
        });
      }
    } catch (err) {
      console.error('[Live Market Hook] Fetch error:', err);
    }
  }, []);

  // 2. Poll every 5-10 seconds (default: 7s)
  useEffect(() => {
    fetchQuotes(); // Initial immediate fetch
    const pollTimer = setInterval(fetchQuotes, pollingIntervalMs);

    return () => {
      clearInterval(pollTimer);
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, [fetchQuotes, pollingIntervalMs]);

  /* 
   * [REMOVED/COMMENTED MOCK DATA SIMULATION]
   * Random delta math and mock tick loops have been disabled.
   * All updates now come purely from real live market network responses.
   */

  return { prices, isLiveApi };
}
