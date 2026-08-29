import { FaChartLine } from 'react-icons/fa6';
import { FaXTwitter, FaLinkedinIn, FaGithub, FaTelegram } from 'react-icons/fa6';

const footerLinks = {
  strategies: [
    { label: 'AlphaNexus Stat-Arb', href: '#strategies' },
    { label: 'VolMatrix Options Surface', href: '#strategies' },
    { label: 'DeepOrder Flow HFT', href: '#strategies' },
    { label: 'TrendPulse Macro', href: '#strategies' },
    { label: 'RegimeShift Asymmetric', href: '#strategies' },
  ],
  technology: [
    { label: 'Colocated Hardware', href: '#edge' },
    { label: 'Rust Execution Kernels', href: '#edge' },
    { label: 'Bayesian Regime Models', href: '#edge' },
    { label: 'Non-Custodial API Gateway', href: '#edge' },
    { label: 'Hardware Kill Switches', href: '#edge' },
  ],
  institutional: [
    { label: 'Schedule Due Diligence', href: '#contact' },
    { label: 'Audited Tear Sheets', href: '#performance' },
    { label: 'Risk Management FAQ', href: '#faq' },
    { label: 'Client Portal Login', href: '#contact' },
    { label: 'Compliance & Disclosures', href: '#contact' },
  ],
};

const socials = [
  { icon: FaXTwitter, href: '#' },
  { icon: FaLinkedinIn, href: '#' },
  { icon: FaGithub, href: '#' },
  { icon: FaTelegram, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-brand-border/80 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan/20 to-brand-emerald/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan text-sm">
                <FaChartLine />
              </div>
              <span className="text-lg font-extrabold text-white">
                QuantMe<span className="text-brand-cyan">Wealth</span>
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Next-generation algorithmic trading, statistical arbitrage, and execution technology
              designed for professional capital.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-brand-card flex items-center justify-center hover:text-brand-cyan hover:border hover:border-brand-cyan/40 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2 text-[11px]">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-brand-cyan transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Risk Disclaimer */}
        <div className="border-t border-brand-border/50 pt-6 text-[10px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-400 font-semibold">Regulatory & Risk Disclaimer:</strong>{' '}
            Quantitative trading, statistical arbitrage, and derivative strategies involve substantial
            risk of capital loss. Past backtested and live historical performances are not indicative
            of future returns. QuantMeWealth provides computational analytics and automated trade
            execution software under non-custodial mandates. Investors must carefully evaluate their
            risk tolerance prior to capital deployment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-500 text-[11px]">
            <div>&copy; 2026 QuantMeWealth Technologies Pvt Ltd. All rights reserved.</div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Risk Disclosure</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
