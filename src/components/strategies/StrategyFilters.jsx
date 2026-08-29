import { strategyFilters } from '../../data/strategies';

export default function StrategyFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
      {strategyFilters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all duration-200 ${
            activeFilter === f.key
              ? 'bg-brand-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'bg-brand-card text-slate-300 hover:text-white hover:bg-brand-cardHover border border-brand-border'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
