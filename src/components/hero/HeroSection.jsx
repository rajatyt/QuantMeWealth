import { FaBolt, FaChartColumn } from 'react-icons/fa6';
import TerminalWidget from './TerminalWidget';

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              <span className="text-xs font-mono font-semibold text-brand-cyan tracking-wider uppercase">
                Statistical Arbitrage & HFT Systems 3.0
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Algorithmic Precision. <br />
              <span className="gradient-text-cyan">Uncorrelated Alpha</span> <br />
              For Institutional Capital.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              QuantMeWealth designs mathematical models, low-latency execution pipelines, and
              risk-parity frameworks engineered to extract consistent yields across equity,
              derivative, and global macro markets.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#strategies"
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-black bg-gradient-to-r from-brand-cyan via-teal-300 to-brand-emerald rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Deploy Capital</span>
                <FaBolt className="text-xs" />
              </a>
              <a
                href="#performance"
                className="w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-200 glass-panel hover:bg-brand-cardHover hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <FaChartColumn className="text-brand-cyan" />
                <span>View Verified Track Record</span>
              </a>
            </div>

            {/* Credibility Stats */}
            <div className="pt-6 border-t border-brand-border/50 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">₹1,850+ Cr</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Assets Monitored</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-brand-emerald">2.85</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">3-Yr Sharpe Ratio</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-brand-cyan">&lt; 0.8ms</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Colo Execution Latency</div>
              </div>
            </div>
          </div>

          {/* Right Widget */}
          <div className="lg:col-span-5">
            <TerminalWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
