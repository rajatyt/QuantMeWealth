export default function SectionHeader({ badge, title, subtitle, className = '' }) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      {badge && (
        <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base mt-3">{subtitle}</p>
      )}
    </div>
  );
}
