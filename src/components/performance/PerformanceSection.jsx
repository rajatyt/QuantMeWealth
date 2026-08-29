import { useState } from 'react';
import GlassPanel from '../ui/GlassPanel';
import PerformanceChart from './PerformanceChart';
import TimeframeSelector from './TimeframeSelector';
import MetricsGrid from './MetricsGrid';

export default function PerformanceSection() {
  const [timeframe, setTimeframe] = useState('3Y');

  return (
    <section id="performance" className="py-20 bg-[#060a15] border-t border-brand-border/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Chart */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-brand-emerald uppercase tracking-wider">
                  Audited Alpha Records
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Cumulative Performance
                </h2>
              </div>
              <TimeframeSelector active={timeframe} onChange={setTimeframe} />
            </div>

            <GlassPanel className="rounded-2xl p-4 sm:p-6 border border-brand-border/90">
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-6 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#00f0ff]" />
                  <span className="text-white font-bold">QuantMe Alpha Master Fund</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">NIFTY 50 Benchmark</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-500" />
                  <span className="text-slate-400">S&P 500 Total Return</span>
                </div>
              </div>
              <PerformanceChart timeframe={timeframe} />
            </GlassPanel>
          </div>

          {/* Right: Metrics */}
          <div className="lg:col-span-4">
            <MetricsGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
