const links = {
  Technology: [
    { label: 'Colocated Hardware', href: '#edge' },
    { label: 'Rust Execution Kernels', href: '#edge' },
    { label: 'Bayesian Regime Models', href: '#edge' },
    { label: 'Non-Custodial API Gateway', href: '#edge' },
  ],
  Institutional: [
    { label: 'Schedule Due Diligence', href: '#contact' },
    { label: 'Audited Tear Sheets', href: '#performance' },
    { label: 'Risk Management FAQ', href: '#faq' },
    { label: 'Client Portal Login', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-[#172545]/80 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/brand-logo.png?v=4" alt="QuantMeWealth Logo" className="h-8 w-auto object-contain" />
              <span className="text-lg font-extrabold text-white">QuantMe<span className="text-cyan-400">Wealth</span></span>
            </div>
            <p className="text-[11px] leading-relaxed">Next-generation algorithmic trading, statistical arbitrage, and execution technology designed for professional capital.</p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-3">
              <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2 text-[11px]">
                {items.map((l) => <li key={l.label}><a href={l.href} className="hover:text-cyan-400 transition-colors">{l.label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#172545]/50 pt-6 text-[10px] text-slate-500 leading-relaxed space-y-2">
          <p><strong className="text-slate-400 font-semibold">Regulatory & Risk Disclaimer:</strong> Quantitative trading involves substantial risk of capital loss. Past performance is not indicative of future returns.</p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-[11px]">
            <div>&copy; 2026 QuantMeWealth Technologies Pvt Ltd. All rights reserved.</div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
