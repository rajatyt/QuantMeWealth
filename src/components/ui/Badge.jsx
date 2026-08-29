const colorMap = {
  cyan: 'bg-cyan-500/10 text-brand-cyan border-cyan-500/30',
  purple: 'bg-purple-500/10 text-brand-purple border-purple-500/30',
  emerald: 'bg-emerald-500/10 text-brand-emerald border-emerald-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
};

export default function Badge({ children, color = 'cyan', className = '' }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border ${colorMap[color] || colorMap.cyan} ${className}`}
    >
      {children}
    </span>
  );
}
