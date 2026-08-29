import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Badge from '../ui/Badge';
import GlassPanel from '../ui/GlassPanel';

export default function StrategyCard({ strategy, onInspect }) {
  return (
    <GlassPanel hover className="rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Badge color={strategy.tagColor}>{strategy.tagLabel}</Badge>
          <span className="text-xs text-slate-400 font-mono">{strategy.badgeText}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{strategy.name}</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">{strategy.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#060a16] border border-brand-border/60 font-mono text-center mb-6">
          <div>
            <span className="text-[10px] text-slate-400 block">CAGR (3Y)</span>
            <span className="text-sm font-bold text-brand-emerald">{strategy.cagr}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Sharpe</span>
            <span className="text-sm font-bold text-white">{strategy.sharpe}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Max DD</span>
            <span className="text-sm font-bold text-brand-rose">{strategy.maxDd}</span>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => onInspect(strategy)}
          className="w-full py-2.5 text-xs font-semibold text-brand-cyan bg-brand-cyan/10 hover:bg-brand-cyan hover:text-black rounded-xl border border-brand-cyan/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Inspect Factsheet</span>
          <FaArrowUpRightFromSquare className="text-[10px]" />
        </button>
      </div>
    </GlassPanel>
  );
}
