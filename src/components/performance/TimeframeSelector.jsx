import { timeframes } from '../../data/performanceData';

export default function TimeframeSelector({ active, onChange }) {
  return (
    <div className="flex items-center bg-brand-card p-1 rounded-xl border border-brand-border text-xs font-mono">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            active === tf
              ? 'bg-brand-cyan text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
}
