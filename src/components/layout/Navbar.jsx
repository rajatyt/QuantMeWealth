import { useState } from 'react';
import { FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#172545]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/favicon.png"
              alt="QuantMeWealth Logo"
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-white tracking-tight">QuantMe</span>
              <span className="text-2xl font-extrabold text-cyan-400 tracking-tight">Wealth</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((l) => <a key={l.href} href={l.href} className="hover:text-cyan-400 transition-colors">{l.label}</a>)}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" className="px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] transition-all flex items-center gap-2"><span>Contact Us</span><FaArrowRight className="text-[11px]" /></a>
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
            <a href="#contact" className="w-full text-center py-3 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg">Contact Us</a>
          </div>
        </div>
      )}
    </header>
  );
}
