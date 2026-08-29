import GlassPanel from '../ui/GlassPanel';

const bgMap = {
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-brand-cyan',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-brand-emerald',
  purple: 'bg-purple-500/10 border-purple-500/30 text-brand-purple',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
};

export default function EdgeCard({ icon: Icon, iconColor, title, description, metric, metricColor }) {
  return (
    <GlassPanel hover className="p-6 rounded-2xl border border-brand-border transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl mb-5 ${bgMap[iconColor]}`}>
        <Icon />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      <div className={`mt-4 pt-4 border-t border-brand-border/60 text-[11px] font-mono ${metricColor}`}>
        {metric}
      </div>
    </GlassPanel>
  );
}
