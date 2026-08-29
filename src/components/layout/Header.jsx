import { useState } from 'react';
import { FaChartLine, FaLock, FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6';

const navLinks = [
  { href: '#strategies', label: 'Strategies' },
  { href: '#performance', label: 'Performance' },
  { href: '#edge', label: 'Quantitative Edge' },
  { href: '#calculator', label: 'Alpha Calculator' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-brand-border/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-emerald/20 border border-brand-cyan/40 group-hover:border-brand-cyan transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <FaChartLine className="text-brand-cyan text-xl group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-emerald rounded-full" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl font-extrabold tracking-tight text-white">QuantMe</span>
                <span className="text-xl font-extrabold tracking-tight text-brand-cyan">Wealth</span>
              </div>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Systematic Alpha Labs
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-cyan transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg border border-brand-border hover:border-brand-borderLight transition-all flex items-center gap-2"
            >
              <FaLock className="text-brand-cyan" /> Client Portal
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-emerald hover:opacity-95 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Get Strategy Access</span>
              <FaArrowRight className="text-[11px]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-slate-400 hover:text-white focus:outline-none p-2"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <FaXmark className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-border/60 bg-[#070b17]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-brand-card hover:text-brand-cyan"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-brand-border/60 flex flex-col gap-3">
            <a href="#contact" className="w-full text-center py-2.5 text-xs font-semibold text-slate-300 rounded-lg border border-brand-border">
              Client Portal
            </a>
            <a href="#contact" className="w-full text-center py-3 text-xs font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-emerald rounded-lg">
              Get Strategy Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
