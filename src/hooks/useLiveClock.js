import { useState, useEffect } from 'react';

export function useLiveClock(intervalMs = 2200) {
  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime());
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return time;
}

function formatTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ms = String(Math.floor(Math.random() * 999)).padStart(3, '0');
  return `${h}:${m}:${s}.${ms} IST`;
}
