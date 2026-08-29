import { FaMicrochip } from 'react-icons/fa6';
import { useLiveClock } from '../../hooks/useLiveClock';
import MiniChart from './MiniChart';

export default function TerminalWidget() {
  const clock = useLiveClock();

  return (
    <div className="relative mx-auto max-w-lg lg:max-w-none">
      {/* Glowing halo */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-emerald opacity-30 blur-xl" />

      <div className="relative glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl border border-brand-border/90">
        {/* Window Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400 font-medium">
              QuantCore_v4.8 :: NSE/BSE Colo
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-brand-emerald border border-emerald-500/30">
            ONLINE
          </span>
        </div>

        {/* Engine Display */}
        <div className="bg-[#050914] rounded-xl p-4 border border-brand-border font-mono text-xs space-y-2.5">
          <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-brand-border/60">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <FaMicrochip className="text-brand-cyan" /> ALPHA ENGINE ACTIVE
            </span>
            <span className="text-[10px] text-brand-cyan">{clock}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="bg-brand-card/80 p-2 rounded border border-brand-border/50">
              <span className="text-slate-400 text-[10px] block">Active Positions</span>
              <span className="text-white font-bold text-sm">48 Pairs</span>
            </div>
            <div className="bg-brand-card/80 p-2 rounded border border-brand-border/50">
              <span className="text-slate-400 text-[10px] block">Net Market Delta</span>
              <span className="text-brand-emerald font-bold text-sm">+0.002 (Neutral)</span>
            </div>
          </div>

          {/* Execution Feed */}
          <div className="pt-2">
            <div className="text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
              <span>Live Execution Feed</span>
              <span className="text-brand-cyan text-[9px] animate-pulse">● STREAMING</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between bg-brand-card/90 px-2.5 py-1.5 rounded border-l-2 border-brand-emerald">
                <span className="text-slate-300">ARB: NIFTY 24900 CE / PE Synthetic</span>
                <span className="text-brand-emerald font-semibold">+₹14,200</span>
              </div>
              <div className="flex items-center justify-between bg-brand-card/90 px-2.5 py-1.5 rounded border-l-2 border-brand-cyan">
                <span className="text-slate-300">MOM: RELIANCE Micro-structure Fill</span>
                <span className="text-brand-cyan font-semibold">0.62ms</span>
              </div>
              <div className="flex items-center justify-between bg-brand-card/90 px-2.5 py-1.5 rounded border-l-2 border-brand-emerald">
                <span className="text-slate-300">VOL: BANKNIFTY Straddle Skew Arb</span>
                <span className="text-brand-emerald font-semibold">+₹28,650</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Alpha Chart */}
        <div className="mt-4 pt-3 border-t border-brand-border/60">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-300">Live Cumulative Return Index</span>
            <span className="text-xs font-mono font-bold text-brand-emerald">+34.8% YTD</span>
          </div>
          <MiniChart />
        </div>
      </div>
    </div>
  );
}
