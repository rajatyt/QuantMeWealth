export default function Button({ children, variant = 'primary', className = '', href, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-300';

  const variants = {
    primary:
      'px-8 py-4 text-sm text-black bg-gradient-to-r from-brand-cyan via-teal-300 to-brand-emerald rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105',
    secondary:
      'px-7 py-4 text-sm font-semibold text-slate-200 glass-panel hover:bg-brand-cardHover hover:text-white rounded-xl',
    cta:
      'px-5 py-2.5 text-xs text-black bg-gradient-to-r from-brand-cyan to-brand-emerald hover:opacity-95 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02]',
    ghost:
      'px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg border border-brand-border hover:border-brand-borderLight',
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
