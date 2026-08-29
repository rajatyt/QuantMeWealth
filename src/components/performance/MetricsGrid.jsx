import { FaCertificate, FaCalculator } from 'react-icons/fa6';
import { metricsData } from '../../data/metricsData';
import GlassPanel from '../ui/GlassPanel';

export default function MetricsGrid() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
        <FaCalculator className="text-brand-cyan" /> Quantitative Diagnostics
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {metricsData.map((m, i) => (
          <GlassPanel key={i} className="p-4 rounded-xl border border-brand-border">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">{m.label}</span>
            <span className={`text-2xl font-mono font-extrabold ${m.color} mt-1 block`}>{m.value}</span>
            <span className="text-[10px] text-slate-500 font-mono">{m.sub}</span>
          </GlassPanel>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#091122] border border-brand-border/70 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <FaCertificate className="text-brand-emerald" />
          <span>Verified Third-Party Auditing</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          All trading executions, fill ratios, and alpha logs are reconciled daily against
          exchange-cleared records and depository statements.
        </p>
      </div>
    </div>
  );
}
