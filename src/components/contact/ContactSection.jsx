import { FaEnvelope, FaLocationDot, FaShieldHeart } from 'react-icons/fa6';
import GlassPanel from '../ui/GlassPanel';
import ContactForm from './ContactForm';

const contactInfo = [
  {
    icon: FaEnvelope,
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-brand-cyan',
    label: 'INSTITUTIONAL DESK',
    value: 'desk@quantmewealth.com',
  },
  {
    icon: FaLocationDot,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-brand-emerald',
    label: 'GLOBAL HUBS',
    value: 'BKC, Mumbai • Wall St, NY • Marina Bay, SG',
  },
  {
    icon: FaShieldHeart,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-brand-purple',
    label: 'SECURITY & AUDITING',
    value: 'SOC2 Certified • 256-Bit SSL Encrypted',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative bg-[#050811] border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30">
                Institutional Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                Connect With Our Quantitative Desk
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                Schedule a confidential strategy session, request live audit sheets, or explore custom
                algorithmic integration for your family office or fund.
              </p>
            </div>

            <div className="space-y-4 text-sm font-mono">
              {contactInfo.map((info, i) => (
                <GlassPanel key={i} className="flex items-center gap-4 p-4 rounded-xl border border-brand-border">
                  <div className={`w-10 h-10 rounded-lg ${info.iconBg} flex items-center justify-center ${info.iconColor}`}>
                    <info.icon />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{info.label}</span>
                    <span className="text-slate-200 font-bold">{info.value}</span>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
