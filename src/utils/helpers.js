export function formatINR(val) {
  return '\u20b9' + Math.round(val).toLocaleString('en-IN');
}

export function formatPrice(value, decimals = 2) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function getLiveClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ms = String(Math.floor(Math.random() * 999)).padStart(3, '0');
  return `${h}:${m}:${s}.${ms} IST`;
}
