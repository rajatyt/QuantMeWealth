import { useState, useEffect, useRef } from 'react';
import { tickerSymbols } from '../data/tickerSymbols';

export function useTickerAnimation(intervalMs = 2200) {
  const [prices, setPrices] = useState(() => {
    const initial = {};
    tickerSymbols.forEach((sym) => {
      initial[sym.id] = {
        price: sym.base,
        flash: null, // 'up' | 'down' | null
      };
    });
    return initial;
  });

  const flashTimeouts = useRef({});

  useEffect(() => {
    const timer = setInterval(() => {
      const sym = tickerSymbols[Math.floor(Math.random() * tickerSymbols.length)];
      const delta = (Math.random() - 0.48) * sym.spread;
      const newPrice = sym.base + delta;
      const flash = delta >= 0 ? 'up' : 'down';

      setPrices((prev) => ({
        ...prev,
        [sym.id]: { price: newPrice, flash },
      }));

      // Clear flash after 500ms
      if (flashTimeouts.current[sym.id]) {
        clearTimeout(flashTimeouts.current[sym.id]);
      }
      flashTimeouts.current[sym.id] = setTimeout(() => {
        setPrices((prev) => ({
          ...prev,
          [sym.id]: { ...prev[sym.id], flash: null },
        }));
      }, 500);
    }, intervalMs);

    return () => {
      clearInterval(timer);
      Object.values(flashTimeouts.current).forEach(clearTimeout);
    };
  }, [intervalMs]);

  return prices;
}
