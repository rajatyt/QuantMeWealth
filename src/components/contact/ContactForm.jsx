import { useState } from 'react';
import { FaPaperPlane, FaSpinner, FaCheck } from 'react-icons/fa6';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      e.target.reset();
    }, 900);
  }

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-brand-border/90 shadow-2xl relative">
      <h3 className="text-xl font-bold text-white mb-2">Request Strategy Whitepaper & Consultation</h3>
      <p className="text-xs text-slate-400 mb-6">Fill in your information to receive our audited quarterly deck.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">FULL NAME *</label>
            <input type="text" required placeholder="e.g. Rajat Sharma" className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-slate-600 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">EMAIL ADDRESS *</label>
            <input type="email" required placeholder="rajat@familyoffice.com" className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-slate-600 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">INVESTOR CATEGORY *</label>
            <select className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border focus:border-brand-cyan focus:outline-none text-sm text-slate-300 transition-colors">
              <option>High Net-Worth Individual (HNW)</option>
              <option>Single / Multi Family Office</option>
              <option>Proprietary Trading Desk</option>
              <option>Institutional Fund</option>
              <option>Independent Qualified Investor</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">PLANNED ALLOCATION *</label>
            <select className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border focus:border-brand-cyan focus:outline-none text-sm text-slate-300 transition-colors">
              <option>₹25 Lakhs – ₹1 Crore</option>
              <option>₹1 Crore – ₹5 Crore</option>
              <option>₹5 Crore – ₹25 Crore</option>
              <option>₹25 Crore+ ($3M+ USD)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">STRATEGY OF INTEREST</label>
          <select className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border focus:border-brand-cyan focus:outline-none text-sm text-slate-300 transition-colors">
            <option>AlphaNexus Statistical Arbitrage</option>
            <option>VolMatrix Options Volatility</option>
            <option>DeepOrder Flow High-Frequency (HFT)</option>
            <option>TrendPulse Macro Momentum</option>
            <option>Custom Multi-Strategy Allocation</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">ADDITIONAL NOTES</label>
          <textarea rows={3} placeholder="Specify any custom mandate, broker preference, or API inquiry..." className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border focus:border-brand-cyan focus:outline-none text-sm text-white placeholder-slate-600 transition-colors" />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 text-sm font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-emerald hover:opacity-95 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <><FaSpinner className="animate-spin" /> Submitting...</>
          ) : (
            <><FaPaperPlane className="text-xs" /> Submit Consultation Request</>
          )}
        </button>
      </form>

      {/* Success Toast */}
      {success && (
        <div className="absolute inset-0 bg-[#070e1e]/95 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 border border-brand-emerald">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-brand-emerald flex items-center justify-center text-2xl border border-emerald-500/40">
            <FaCheck />
          </div>
          <h4 className="text-xl font-bold text-white">Consultation Request Received</h4>
          <p className="text-xs text-slate-400 max-w-md">
            Thank you. Our senior quantitative desk will review your mandate and deliver the audited quarterly factbook to your email within 4 business hours.
          </p>
          <button onClick={() => setSuccess(false)} className="px-6 py-2.5 text-xs font-bold font-mono bg-brand-emerald text-black rounded-lg hover:opacity-90">
            Done
          </button>
        </div>
      )}
    </div>
  );
}
