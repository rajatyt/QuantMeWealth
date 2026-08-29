import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import GlassPanel from '../ui/GlassPanel';

export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassPanel className="rounded-xl border border-brand-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left flex items-center justify-between font-semibold text-white hover:text-brand-cyan transition-colors"
      >
        <span>{question}</span>
        <FaChevronDown
          className={`text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-brand-border/40 pt-3">
          {answer}
        </div>
      )}
    </GlassPanel>
  );
}
