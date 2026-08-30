import { useState } from 'react';
import { FaChartLine, FaLock, FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#172545]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <FaChartLine className="text-cyan-400 text-xl group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </div>
            <div>
              <div className="flex"><span className="text-xl font-extrabold text-white">QuantMe</span><span className="text-xl font-extrabold text-cyan-400">Wealth</span></div>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">Systematic Alpha Labs</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((l) => <a key={l.href} href={l.href} className="hover:text-cyan-400 transition-colors">{l.label}</a>)}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg border border-[#172545] hover:border-[#243763] transition-all flex items-center gap-2"><FaLock className="text-cyan-400" /> Client Portal</a>
            <a href="#contact" className="px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] transition-all flex items-center gap-2"><span>Get Strategy Access</span><FaArrowRight className="text-[11px]" /></a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white p-2" aria-label="Menu">
            {open ? <FaXmark className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#172545]/60 bg-[#070b17]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#0a101f] hover:text-cyan-400">{l.label}</a>)}
          <div className="pt-4 border-t border-[#172545]/60 flex flex-col gap-3">
            <a href="#contact" className="w-full text-center py-2.5 text-xs font-semibold text-slate-300 rounded-lg border border-[#172545]">Client Portal</a>
            <a href="#contact" className="w-full text-center py-3 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg">Get Strategy Access</a>
          </div>
        </div>
      )}
    </header>
  );
}
