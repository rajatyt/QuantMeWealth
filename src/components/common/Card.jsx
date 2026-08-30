export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`glass-panel ${hover ? 'glass-panel-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
