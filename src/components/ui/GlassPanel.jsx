export default function GlassPanel({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`glass-panel ${hover ? 'glass-panel-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
