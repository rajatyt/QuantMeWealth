import Card from '../common/Card';

export default function PortfolioCard({ title = 'Portfolio', value = '₹0', change = '+0%' }) {
  return (
    <Card className="p-5 rounded-xl border border-[#172545]">
      <p className="text-xs font-mono text-slate-400 uppercase">{title}</p>
      <p className="text-2xl font-mono font-bold text-white mt-1">{value}</p>
      <p className="text-xs font-mono text-emerald-400 mt-1">{change}</p>
    </Card>
  );
}
