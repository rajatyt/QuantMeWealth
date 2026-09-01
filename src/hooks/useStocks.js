import { useState, useEffect, useRef, useCallback } from 'react';
import { tickerSymbols } from '../data/mockData';
import { fetchLiveMarketQuotes } from '../services/stockService';

export function useStocks(pollingIntervalMs = 30000, microSimulationIntervalMs = 2500) {
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

  // Helper to trigger a temporary green/red price flash
  const triggerFlash = useCallback((id, direction) => {
    setPrices((prev) => ({
      ...prev,
      [id]: { ...prev[id], flash: direction },
    }));

    if (timeouts.current[id]) clearTimeout(timeouts.current[id]);
    timeouts.current[id] = setTimeout(() => {
      setPrices((prev) => ({
        ...prev,
        [id]: { ...prev[id], flash: null },
      }));
    }, 500);
  }, []);

  // 1. Fetch live quotes from RapidAPI
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
            if (oldPrice !== undefined && quote.price !== oldPrice) {
              flash = quote.price > oldPrice ? 'up' : 'down';
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
      console.error('Failed to update live stocks:', err);
    }
  }, []);

  // 2. Initial fetch & RapidAPI polling interval
  useEffect(() => {
    fetchQuotes();
    const pollTimer = setInterval(fetchQuotes, pollingIntervalMs);
    return () => clearInterval(pollTimer);
  }, [fetchQuotes, pollingIntervalMs]);

  // 3. Realistic micro-fluctuations (runs when live API is not configured or in between poll ticks)
  useEffect(() => {
    if (isLiveApi) return; // If real API is streaming, don't simulate

    const simTimer = setInterval(() => {
      const sym = tickerSymbols[Math.floor(Math.random() * tickerSymbols.length)];
      const delta = (Math.random() - 0.48) * sym.spread;
      const newPrice = sym.base + delta;
      const flash = delta >= 0 ? 'up' : 'down';

      setPrices((prev) => ({
        ...prev,
        [sym.id]: {
          ...prev[sym.id],
          price: newPrice,
          flash,
        },
      }));

      triggerFlash(sym.id, flash);
    }, microSimulationIntervalMs);

    return () => {
      clearInterval(simTimer);
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, [isLiveApi, microSimulationIntervalMs, triggerFlash]);

  return { prices, isLiveApi };
}
