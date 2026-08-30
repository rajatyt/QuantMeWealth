import Card from '../common/Card';
import { tickerSymbols } from '../../data/mockData';
import { formatPrice } from '../../utils/helpers';

export default function MarketOverview() {
  return (
    <Card className="p-6 rounded-xl border border-[#172545]">
      <h3 className="text-sm font-bold text-white mb-4 font-mono uppercase">Market Overview</h3>
      <div className="space-y-3">
        {tickerSymbols.slice(0, 5).map((s) => (
          <div key={s.id} className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">{s.label}</span>
            <span className="text-white font-mono">{formatPrice(s.base, s.decimals)}</span>
            <span className={s.up ? 'text-emerald-400' : 'text-rose-400'}>{s.change}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
