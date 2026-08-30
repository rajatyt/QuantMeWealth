import Card from '../common/Card';

export default function StockCard({ symbol = 'NIFTY', price = '0', change = '+0%', up = true }) {
  return (
    <Card className="p-4 rounded-xl border border-[#172545]">
      <p className="text-sm font-bold text-white">{symbol}</p>
      <p className="text-lg font-mono font-bold text-white mt-1">{price}</p>
      <p className={`text-xs font-mono mt-1 ${up ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</p>
    </Card>
  );
}
