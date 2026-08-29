import SectionHeader from '../ui/SectionHeader';
import GlassPanel from '../ui/GlassPanel';
import { useCalculator, formatINR } from '../../hooks/useCalculator';

export default function CalculatorSection() {
  const {
    capital, setCapital,
    years, setYears,
    selectedProfile, setSelectedProfile,
    strategyProfiles,
    results,
  } = useCalculator();

  return (
    <section id="calculator" className="py-20 bg-[#060a14] border-y border-brand-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Simulated Compounding Engine"
          title="Calculate Potential Alpha Growth"
          subtitle="Simulate returns based on historical backtested and live out-of-sample data across market regimes."
          className="mb-14"
        />

        <div className="max-w-4xl mx-auto">
          <GlassPanel className="rounded-3xl p-6 sm:p-10 border border-brand-border shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* Capital Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-slate-300 font-semibold">INVESTMENT ALLOCATION</label>
                    <span className="text-lg font-mono font-bold text-brand-cyan">{formatINR(capital)}</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={50000000}
                    step={500000}
                    value={capital}
                    onChange={(e) => setCapital(Number(e.target.value))}
                    className="w-full h-2 bg-brand-card rounded-lg appearance-none cursor-pointer border border-brand-border"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>₹10 Lakhs</span>
                    <span>₹2.5 Cr</span>
                    <span>₹5 Crore</span>
                  </div>
                </div>

                {/* Horizon Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-slate-300 font-semibold">TIME HORIZON</label>
                    <span className="text-lg font-mono font-bold text-brand-emerald">
                      {years} Year{years > 1 ? 's' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-brand-card rounded-lg appearance-none cursor-pointer border border-brand-border"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>1 Year</span>
                    <span>3 Years</span>
                    <span>5 Years</span>
                  </div>
                </div>

                {/* Strategy Profiles */}
                <div>
                  <label className="text-xs font-mono text-slate-300 font-semibold block mb-2">STRATEGY PROFILE</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {strategyProfiles.map((profile, i) => (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => setSelectedProfile(i)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedProfile === i
                            ? 'border-brand-cyan bg-brand-cyan/10'
                            : 'border-brand-border bg-brand-card hover:bg-brand-cardHover'
                        }`}
                      >
                        <span className="block text-xs font-bold text-white">{profile.label}</span>
                        <span className={`block text-[10px] font-mono mt-0.5 ${
                          selectedProfile === i ? 'text-brand-cyan' : 'text-slate-400'
                        }`}>
                          {profile.sublabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output */}
              <div className="lg:col-span-5 bg-[#080e1c] rounded-2xl p-6 border border-brand-border/90 text-center space-y-5">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Estimated Portfolio Value</span>
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white mt-1 block">
                    {formatINR(results.estimatedValue)}
                  </span>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-brand-emerald border border-emerald-500/30">
                    +{formatINR(results.totalGain)} (+{results.percentageGain.toFixed(1)}%)
                  </span>
                </div>

                <div className="space-y-2 pt-4 border-t border-brand-border/60 text-xs font-mono text-left">
                  <div className="flex justify-between text-slate-400">
                    <span>Benchmark Index Estimate:</span>
                    <span className="text-slate-300 font-semibold">{formatINR(results.benchmarkEstimate)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Net Excess Alpha Generated:</span>
                    <span className="text-brand-cyan font-bold">+{formatINR(results.excessAlpha)}</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-3 text-xs font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-emerald rounded-xl block hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  Inquire For Allocation
                </a>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
