import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_CONFIG } from '../../utils/constants';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const { phoneNumber, defaultMessage } = WHATSAPP_CONFIG;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Interactive Tooltip / Label */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a101f]/95 border border-[#172545] text-xs font-mono shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-2 scale-95'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-slate-300 font-medium">Chat on WhatsApp Desk</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact QuantMeWealth on WhatsApp Business"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing Outer Glow Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 blur-md group-hover:opacity-60 animate-pulse transition-opacity" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative text-3xl drop-shadow-md transition-transform duration-300 group-hover:scale-110" />

        {/* Live Notification Indicator Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#050811] rounded-full shadow-sm" />
      </a>
    </div>
  );
}
