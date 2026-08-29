import { trustRibbonStats } from '../../data/metricsData';

export default function TrustRibbon() {
  return (
    <section className="border-y border-brand-border/70 bg-[#070c1a]/90 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {trustRibbonStats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-center justify-center gap-1">
                <span>{stat.value}</span>
                <span className={`text-xl ${stat.color}`}>{stat.suffix}</span>
              </div>
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
