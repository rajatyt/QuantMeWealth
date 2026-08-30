import { useState, useEffect, useRef } from 'react';
import { tickerSymbols } from '../data/mockData';

export function useStocks(intervalMs = 2200) {
  const [prices, setPrices] = useState(() => {
    const init = {};
    tickerSymbols.forEach((s) => {
      init[s.id] = { price: s.base, flash: null };
    });
    return init;
  });

  const timeouts = useRef({});

  useEffect(() => {
    const timer = setInterval(() => {
      const sym = tickerSymbols[Math.floor(Math.random() * tickerSymbols.length)];
      const delta = (Math.random() - 0.48) * sym.spread;
      const newPrice = sym.base + delta;
      const flash = delta >= 0 ? 'up' : 'down';

      setPrices((prev) => ({ ...prev, [sym.id]: { price: newPrice, flash } }));

      if (timeouts.current[sym.id]) clearTimeout(timeouts.current[sym.id]);
      timeouts.current[sym.id] = setTimeout(() => {
        setPrices((prev) => ({ ...prev, [sym.id]: { ...prev[sym.id], flash: null } }));
      }, 500);
    }, intervalMs);

    return () => {
      clearInterval(timer);
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, [intervalMs]);

  return prices;
}
