import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { useTickerAnimation } from '../../hooks/useTickerAnimation';
import { tickerSymbols } from '../../data/tickerSymbols';

function TickerItem({ sym, priceData }) {
  const displayPrice = priceData
    ? `${sym.prefix}${priceData.price.toLocaleString('en-US', {
        minimumFractionDigits: sym.decimals,
        maximumFractionDigits: sym.decimals,
      })}`
    : `${sym.prefix}${sym.base.toLocaleString('en-US', {
        minimumFractionDigits: sym.decimals,
        maximumFractionDigits: sym.decimals,
      })}`;

  const flash = priceData?.flash;
  const priceColor = flash === 'up' ? '#10b981' : flash === 'down' ? '#f43f5e' : '#ffffff';
  const isUp = sym.up;

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400 font-semibold">{sym.label}</span>
      <span
        className="text-white font-mono font-bold transition-colors duration-200"
        style={{ color: priceColor }}
      >
        {displayPrice}
      </span>
      <span
        className={`flex items-center gap-0.5 font-bold ${
          isUp ? 'text-brand-emerald' : 'text-brand-rose'
        }`}
      >
        {isUp ? (
          <FaArrowTrendUp className="text-[10px]" />
        ) : (
          <FaArrowTrendDown className="text-[10px]" />
        )}
        {sym.defaultChange}
      </span>
    </div>
  );
}

export default function Ticker() {
  const prices = useTickerAnimation();

  const renderTrack = (ariaHidden = false) => (
    <div className="flex items-center gap-8 px-4" aria-hidden={ariaHidden || undefined}>
      {tickerSymbols.map((sym) => (
        <TickerItem key={sym.id} sym={sym} priceData={ariaHidden ? null : prices[sym.id]} />
      ))}
    </div>
  );

  return (
    <div className="relative z-50 bg-[#04060d] border-b border-brand-border/60 text-xs font-mono py-2 overflow-hidden ticker-wrap select-none">
      <div className="flex items-center">
        <div className="flex items-center px-4 shrink-0 bg-[#04060d] z-20 border-r border-brand-border/80 text-brand-cyan gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[11px]">LIVE MARKETS</span>
        </div>
        <div className="flex whitespace-nowrap animate-ticker ticker-move">
          {renderTrack(false)}
          {renderTrack(true)}
        </div>
      </div>
    </div>
  );
}
