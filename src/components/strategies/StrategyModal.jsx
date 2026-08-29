import { FaXmark } from 'react-icons/fa6';

export default function StrategyModal({ strategy, onClose }) {
  if (!strategy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl bg-[#091021] border border-brand-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div>
            <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase">
              {strategy.modalType}
            </span>
            <h3 className="text-2xl font-bold text-white">{strategy.name}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 text-lg">
            <FaXmark />
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 font-mono text-center">
          <div className="bg-brand-card p-3 rounded-xl border border-brand-border/70">
            <span className="text-[10px] text-slate-400 block">TARGET CAGR</span>
            <span className="text-base font-bold text-brand-emerald">{strategy.cagr}</span>
          </div>
          <div className="bg-brand-card p-3 rounded-xl border border-brand-border/70">
            <span className="text-[10px] text-slate-400 block">SHARPE RATIO</span>
            <span className="text-base font-bold text-brand-cyan">{strategy.sharpe}</span>
          </div>
          <div className="bg-brand-card p-3 rounded-xl border border-brand-border/70">
            <span className="text-[10px] text-slate-400 block">HISTORICAL MAX DD</span>
            <span className="text-base font-bold text-brand-rose">{strategy.maxDd}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-brand-border/50">
            <span className="text-slate-400">Tradable Asset Universe:</span>
            <span className="text-slate-200 font-semibold font-mono">{strategy.universe}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-border/50">
            <span className="text-slate-400">Risk Profile:</span>
            <span className="text-slate-200 font-semibold font-mono">{strategy.risk}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-border/50">
            <span className="text-slate-400">Minimum Account Size:</span>
            <span className="text-brand-cyan font-semibold font-mono">{strategy.minCapital}</span>
          </div>
          <div className="py-2">
            <span className="text-slate-400 block mb-1">Algorithmic Formulation:</span>
            <p className="text-slate-300 leading-relaxed bg-[#050914] p-3 rounded-lg border border-brand-border/60">
              {strategy.algorithmDesc}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full py-3 text-center text-xs font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-emerald rounded-xl hover:opacity-95 transition-all"
          >
            Request Direct Allocation
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-semibold text-slate-300 glass-panel rounded-xl hover:bg-brand-cardHover"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
