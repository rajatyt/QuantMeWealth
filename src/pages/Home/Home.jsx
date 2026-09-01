import { useState, useEffect, useMemo } from 'react';
import { FaBolt, FaChartColumn, FaArrowTrendUp, FaArrowTrendDown, FaMicrochip, FaChevronDown, FaPaperPlane, FaSpinner, FaCheck, FaBoltLightning, FaBrain, FaShieldHalved, FaCloudArrowUp, FaArrowUpRightFromSquare, FaXmark, FaEnvelope, FaLocationDot, FaShieldHeart, FaTv, FaTriangleExclamation } from 'react-icons/fa6';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';

import { useStocks } from '../../hooks/useStocks';
import { tickerSymbols, strategies, strategyFilters, performanceData, timeframes, metricsData, trustRibbonStats, edgePillars, faqData, calcProfiles } from '../../data/mockData';
import { formatINR, formatPrice, getLiveClock } from '../../utils/helpers';
import { BENCHMARK_CAGR } from '../../utils/constants';
import Card from '../../components/common/Card';
import './Home.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

const edgeIcons = { bolt: FaBoltLightning, brain: FaBrain, shield: FaShieldHalved, cloud: FaCloudArrowUp, envelope: FaEnvelope, tv: FaTv };
const tagColors = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
};

export default function Home() {
  return (
    <>
      <TickerBar />
      <HeroSection />
      <TrustRibbon />
      {/* Systematic Portfolio Engines (Hidden as requested) */}
      {/* <StrategiesSection /> */}
      {/* Audited Alpha Record (Hidden as requested) */}
      {/* <PerformanceSection /> */}
      <EdgeAndCalculatorSection />
      <SubscriptionSection />
      <AboutSection />
      <ContactSection />
      <FaqSection />
    </>
  );
}

/* ═══════════════════ TICKER BAR ═══════════════════ */
function TickerBar() {
  const { prices, isLiveApi } = useStocks();
  const renderTrack = () => (
    <div className="flex items-center gap-8 px-4">
      {tickerSymbols.map((s) => {
        const p = prices[s.id];
        const color = p?.flash === 'up' ? '#10b981' : p?.flash === 'down' ? '#f43f5e' : '#fff';
        const displayChange = p?.change ?? s.change;
        const isUp = p?.up ?? s.up;

        return (
          <div key={s.id} className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">{s.label}</span>
            <span className="text-white font-mono font-bold transition-colors duration-200" style={{ color }}>
              {formatPrice(p?.price ?? s.base, s.decimals)}
            </span>
            <span className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isUp ? <FaArrowTrendUp className="text-[10px]" /> : <FaArrowTrendDown className="text-[10px]" />}
              {displayChange}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative z-50 bg-[#04060d] border-b border-[#172545]/60 text-xs font-mono py-2 overflow-hidden ticker-wrap select-none">
      <div className="flex items-center">
        <div className="flex items-center px-4 shrink-0 bg-[#04060d] z-20 border-r border-[#172545]/80 text-cyan-400 gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[11px]">
            {isLiveApi ? 'LIVE MARKETS' : 'LIVE MARKETS'}
          </span>
        </div>
        <div className="flex whitespace-nowrap animate-ticker ticker-move">{renderTrack()}{renderTrack()}</div>
      </div>
    </div>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function HeroSection() {
  const [clock, setClock] = useState(getLiveClock());
  useEffect(() => { const t = setInterval(() => setClock(getLiveClock()), 2200); return () => clearInterval(t); }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400 tracking-wider uppercase">Live trading since 2021</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Algorithmic Precision. <br /><span className="gradient-text-cyan">Trade Smart.</span> <br />Trade Precise.
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              QuantMeWealth delivers a next-gen trading experience with automated strategies, real-time analytics, and seamless execution—built for traders who want more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#subscription" className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-3"><span>View Subscriptions</span><FaBolt className="text-xs" /></a>
            </div>
          </div>
          {/* Terminal widget */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 opacity-30 blur-xl" />
              <Card className="relative rounded-2xl p-5 sm:p-6 shadow-2xl border border-[#172545]/90">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#172545]/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" /><span className="w-3 h-3 rounded-full bg-amber-500/80" /><span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">QuantMeWealth :: Verified Algo Trading Desk</span>
                  </div>
                </div>
                <div className="bg-[#050914] rounded-xl p-5 border border-[#172545] space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#172545]/80">
                    <div className="flex items-center gap-2.5">
                      <FaShieldHeart className="text-emerald-400 text-base" />
                      <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                        Trust with confidence
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 rounded-md">
                      VERIFIED
                    </span>
                  </div>

                  {/* 3 Points */}
                  <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
                    <div className="flex items-start gap-3 bg-[#0a101f]/90 p-3.5 rounded-xl border border-[#172545]/70 hover:border-emerald-500/40 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        <FaCheck />
                      </div>
                      <span className="font-medium">API integration with most trusted discount brokers.</span>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0a101f]/90 p-3.5 rounded-xl border border-[#172545]/70 hover:border-cyan-500/40 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        <FaCheck />
                      </div>
                      <span className="font-medium">VaR is less than 3500 per trade with 95% Confidence level.</span>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0a101f]/90 p-3.5 rounded-xl border border-[#172545]/70 hover:border-purple-500/40 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        <FaCheck />
                      </div>
                      <span className="font-medium">No spam or gimmicks- only Live market algo demonstration.</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#172545]/60">
                  <div className="flex justify-between items-center mb-2"><span className="text-xs font-semibold text-slate-300">Live Cumulative Return Index</span><span className="text-xs font-mono font-bold text-emerald-400">+34.8% YTD</span></div>
                  <MiniChart />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniChart() {
  const data = {
    labels: ['09:15','10:00','11:00','12:00','13:00','14:00','15:00','15:30'],
    datasets: [{
      data: [100,102.4,105.1,104.8,108.5,112.1,114.6,118.2],
      borderColor: '#00f0ff', borderWidth: 2, pointRadius: 0, tension: 0.35, fill: true,
      backgroundColor: (ctx) => {
        const { ctx: c, chartArea } = ctx.chart;
        if (!chartArea) return null;
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, 'rgba(0,240,255,0.3)'); g.addColorStop(1, 'rgba(0,240,255,0)');
        return g;
      },
    }],
  };
  return <div className="h-24 w-full"><Line data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }} /></div>;
}

/* ═══════════════════ TRUST RIBBON ═══════════════════ */
function TrustRibbon() {
  return (
    <section className="border-y border-[#172545]/70 bg-[#070c1a]/90 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {trustRibbonStats.map((s, i) => (
          <div key={i}><div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-center justify-center gap-1"><span>{s.value}</span><span className={`text-xl ${s.color}`}>{s.suffix}</span></div><p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">{s.label}</p></div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ STRATEGIES ═══════════════════ */
function StrategiesSection() {
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(null);
  const list = filter === 'all' ? strategies : strategies.filter((s) => s.category === filter);

  return (
    <section id="strategies" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Systematic Portfolio Engines" title="Engineered Quantitative Strategies" sub="Mathematically verified, regime-adaptive models engineered for ultra-low drawdowns and high capital efficiency." />
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {strategyFilters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${filter === f.key ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-[#0a101f] text-slate-300 hover:text-white border border-[#172545]'}`}>{f.label}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s) => (
            <Card key={s.id} hover className="rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4"><span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border ${tagColors[s.tagColor]}`}>{s.tag}</span><span className="text-xs text-slate-400 font-mono">{s.badge}</span></div>
                <h3 className="text-xl font-bold text-white mb-2">{s.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#060a16] border border-[#172545]/60 font-mono text-center mb-6">
                  <div><span className="text-[10px] text-slate-400 block">CAGR</span><span className="text-sm font-bold text-emerald-400">{s.cagr}</span></div>
                  <div><span className="text-[10px] text-slate-400 block">Sharpe</span><span className="text-sm font-bold text-white">{s.sharpe}</span></div>
                  <div><span className="text-[10px] text-slate-400 block">Max DD</span><span className="text-sm font-bold text-rose-400">{s.maxDd}</span></div>
                </div>
              </div>
              <button onClick={() => setModal(s)} className="w-full py-2.5 text-xs font-semibold text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400 hover:text-black rounded-xl border border-cyan-500/30 transition-all flex items-center justify-center gap-2"><span>Inspect Factsheet</span><FaArrowUpRightFromSquare className="text-[10px]" /></button>
            </Card>
          ))}
        </div>
      </div>
      {modal && <StrategyModal s={modal} onClose={() => setModal(null)} />}
    </section>
  );
}

function StrategyModal({ s, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl bg-[#091021] border border-[#172545] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#172545]"><div><span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">{s.modalType}</span><h3 className="text-2xl font-bold text-white">{s.name}</h3></div><button onClick={onClose} className="text-slate-400 hover:text-white p-2"><FaXmark /></button></div>
        <div className="grid grid-cols-3 gap-3 font-mono text-center">
          <div className="bg-[#0a101f] p-3 rounded-xl border border-[#172545]/70"><span className="text-[10px] text-slate-400 block">TARGET CAGR</span><span className="text-base font-bold text-emerald-400">{s.cagr}</span></div>
          <div className="bg-[#0a101f] p-3 rounded-xl border border-[#172545]/70"><span className="text-[10px] text-slate-400 block">SHARPE</span><span className="text-base font-bold text-cyan-400">{s.sharpe}</span></div>
          <div className="bg-[#0a101f] p-3 rounded-xl border border-[#172545]/70"><span className="text-[10px] text-slate-400 block">MAX DD</span><span className="text-base font-bold text-rose-400">{s.maxDd}</span></div>
        </div>
        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-[#172545]/50"><span className="text-slate-400">Universe:</span><span className="text-slate-200 font-mono">{s.universe}</span></div>
          <div className="flex justify-between py-2 border-b border-[#172545]/50"><span className="text-slate-400">Risk:</span><span className="text-slate-200 font-mono">{s.risk}</span></div>
          <div className="flex justify-between py-2 border-b border-[#172545]/50"><span className="text-slate-400">Min Capital:</span><span className="text-cyan-400 font-mono">{s.minCap}</span></div>
          <div className="py-2"><span className="text-slate-400 block mb-1">Algorithm:</span><p className="text-slate-300 leading-relaxed bg-[#050914] p-3 rounded-lg border border-[#172545]/60">{s.algo}</p></div>
        </div>
        <div className="pt-4 flex gap-3">
          <a href="#contact" onClick={onClose} className="w-full py-3 text-center text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl">Request Allocation</a>
          <button onClick={onClose} className="px-6 py-3 text-xs font-semibold text-slate-300 glass-panel rounded-xl hover:bg-[#0f172e]">Close</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SUBSCRIPTION & PRICING ═══════════════════ */
function SubscriptionSection() {
  return (
    <section id="subscription" className="py-24 bg-[#060a15] border-t border-[#172545]/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* High-Focus Highlighted Minimum Capital Requirement Terms Card */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.25)]">
            <div className="bg-[#090e1f] rounded-[23px] p-6 sm:p-8 relative overflow-hidden space-y-5">
              {/* Top ambient warm glow */}
              <div className="absolute top-0 left-1/4 w-80 h-32 bg-amber-500/15 blur-3xl pointer-events-none" />

              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/30 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 text-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0">
                    <FaTriangleExclamation />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 tracking-widest uppercase block">
                      MANDATORY PREREQUISITE
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      Minimum Capital Requirement
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Terms & Conditions</span>
                </div>
              </div>

              {/* Core Highlighted Points */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-200 relative z-10">
                {/* Point 1: Capital Requirement */}
                <div className="flex items-start gap-3.5 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  <div className="leading-relaxed">
                    Traders need to have a minimum of{' '}
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/50 text-amber-300 font-mono font-bold text-sm">
                      10,000/- to 15,000/-
                    </span>{' '}
                    for trading purposes for the segment of{' '}
                    <strong className="text-white font-semibold">Equity-Cash</strong>,{' '}
                    <strong className="text-white font-semibold">Future & Options</strong>, and{' '}
                    <strong className="text-white font-semibold">Commodity</strong>.
                  </div>
                </div>

                {/* Point 2: Risk Appetite */}
                <div className="flex items-start gap-3.5 bg-[#060a14] p-4 rounded-2xl border border-amber-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <div className="leading-relaxed text-slate-300">
                    <strong className="text-rose-400 font-bold uppercase font-mono tracking-wide">Risk Disclosure: </strong>
                    One Needs to have high Risk Appetite to trade in Stock Market.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionHeader
          badge="Access & Subscriptions"
          title="Algorithmic Trading Services"
          sub="Deploy institutional-grade automated trading systems directly to your brokerage account with zero manual intervention."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Plan 1: Active Algo Trading Service (Early Bird ₹5,000) */}
          <div className="relative rounded-3xl p-8 sm:p-10 glass-panel border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.15)] flex flex-col justify-between overflow-hidden">
            {/* Early bird tag */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-400 to-cyan-400 text-black text-[11px] font-mono font-extrabold px-4 py-1.5 rounded-bl-2xl shadow-md uppercase tracking-wider">
              🔥 50% OFF EARLY BIRD
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-4">
                <span>ACTIVE SERVICE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Automated Algo Trading Suite</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Complete access to our statistical arbitrage and options volatility execution systems with zero execution delay.
              </p>

              {/* Pricing Display */}
              <div className="mt-6 p-4 rounded-2xl bg-[#050914] border border-[#172545]/80 font-mono">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-slate-500 line-through text-lg font-bold">₹10,000</span>
                  <span className="text-4xl font-extrabold text-white">₹4,999</span>
                  <span className="text-xs text-slate-400">+ taxes / service fee</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mt-8 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Fully automated multi-leg Options & Statistical Arbitrage execution</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Non-custodial Broker API integration (Zerodha, AngelOne, Fyers, Upstox)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Sub-second execution & latency-optimized order routing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Real-time trade fill notifications via WhatsApp & Telegram</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Automated stop-loss & dynamic volatility circuit breakers</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>1-on-1 strategy onboarding & dedicated technical desk assistance</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#172545]/60">
              <a
                href="#contact"
                className="w-full py-4 text-center text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Claim Early Bird Access (₹4,999 + taxes)</span>
                <FaBolt className="text-xs" />
              </a>
            </div>
          </div>

          {/* Plan 2: Upcoming Next-Gen Algo (Coming Soon ₹12,000 - Blurred with Sharp Pricing) */}
          <div className="relative rounded-3xl p-8 sm:p-10 glass-panel border border-purple-500/40 shadow-[0_0_35px_rgba(139,92,246,0.15)] flex flex-col justify-between overflow-hidden">
            {/* Coming Soon ribbon */}
            <div className="absolute top-0 right-0 z-30 bg-gradient-to-l from-purple-500 to-indigo-500 text-white text-[11px] font-mono font-extrabold px-4 py-1.5 rounded-bl-2xl shadow-md uppercase tracking-wider">
              🚀 COMING SOON
            </div>

            {/* 1. SHARP, UNBLURRED PRICING & SERVICE FEE */}
            <div className="relative z-30 mb-6 p-5 rounded-2xl bg-[#080d1e]/95 border-2 border-purple-500/60 shadow-[0_0_30px_rgba(139,92,246,0.25)] backdrop-blur-xl font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold block mb-1">
                    NEW ALGO SERVICE FEE
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">₹12,000</span>
                    <span className="text-xs text-slate-400">/ service fee</span>
                  </div>
                </div>
                <span className="self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Pre-Book Open
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                🔒 Priority queue reservation • Locked-in early-bird pricing
              </p>
            </div>

            {/* 2. BLURRED DETAILS & FEATURES */}
            <div className="relative blur-[3.5px] select-none pointer-events-none opacity-45 transition-all space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold mb-3">
                  <span>NEXT-GEN ARCHITECTURE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">DeepOrder Flow Neural HFT</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Next-generation Level 3 order-book microstructure AI engine engineered for high-frequency tick imbalance capture.
                </p>
              </div>

              {/* Feature Checklist (Blurred) */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Ultra-HFT Level 3 order-book microstructure queue prediction model</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Deep Neural Network & Bayesian market regime-switching filters</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Real-time implied vs realized cross-asset dispersion scanner</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Priority co-location server slot & dedicated ultra-low latency routing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5"><FaCheck /></div>
                  <span>Locked-in legacy price guarantee upon public production release</span>
                </div>
              </div>
            </div>

            {/* 3. UNBLURRED ACTION BUTTON */}
            <div className="relative z-30 mt-6 pt-4 border-t border-[#172545]/60">
              <a
                href="#contact"
                className="w-full py-4 text-center text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Join Priority Waitlist (₹12,000 Tier)</span>
                <FaBolt className="text-xs text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ ABOUT OUR COMPANY ═══════════════════ */
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#050812] border-t border-[#172545]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Company Profile"
          title="About Our Company"
          sub="Empowering traders with institutional-grade computational intelligence and execution precision."
        />

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="rounded-3xl p-8 sm:p-10 border border-[#172545] shadow-2xl relative bg-[#070d1e]/90 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3.5 pb-4 mb-6 border-b border-[#172545]/80">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-xl shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <FaBrain />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Algologic
                </h3>
                <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider block">
                  AI-Driven Quantitative Advisory
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Algologic is a fast, versatile, and AI-driven algorithmic advisory platform built for modern quantitative trading. We blend deep tech expertise with advanced trading strategies to deliver scalable, secure, and high-performance solutions. Our team of engineers, scientists, and traders work together to push the boundaries of innovation in financial technology.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#172545]/60 font-mono">
              <div className="bg-[#050914] p-4 rounded-2xl border border-[#172545]/70 text-center">
                <span className="text-xs font-bold text-cyan-400 block uppercase">Deep Tech Stack</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Engineered Algorithms</span>
              </div>
              <div className="bg-[#050914] p-4 rounded-2xl border border-[#172545]/70 text-center">
                <span className="text-xs font-bold text-emerald-400 block uppercase">AI-Driven Advisory</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Adaptive Intelligence</span>
              </div>
              <div className="bg-[#050914] p-4 rounded-2xl border border-[#172545]/70 text-center">
                <span className="text-xs font-bold text-purple-400 block uppercase">Secure & Scalable</span>
                <span className="text-[11px] text-slate-400 mt-1 block">High Performance</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PERFORMANCE (HIDDEN) ═══════════════════ */
function PerformanceSection() {
  const [tf, setTf] = useState('3Y');
  const d = performanceData[tf];
  const chartData = useMemo(() => ({
    labels: d.labels,
    datasets: [
      { label: 'QuantMe Alpha', data: d.alpha, borderColor: '#00f0ff', borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#00f0ff', pointBorderColor: '#091021', pointBorderWidth: 2, tension: 0.35, fill: true,
        backgroundColor: (ctx) => { const { ctx: c, chartArea } = ctx.chart; if (!chartArea) return null; const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom); g.addColorStop(0, 'rgba(0,240,255,0.25)'); g.addColorStop(1, 'rgba(0,240,255,0)'); return g; } },
      { label: 'NIFTY 50', data: d.nifty, borderColor: '#10b981', borderWidth: 2, borderDash: [5,5], pointRadius: 0, tension: 0.35, fill: false },
      { label: 'S&P 500', data: d.sp, borderColor: '#64748b', borderWidth: 2, pointRadius: 0, tension: 0.35, fill: false },
    ],
  }), [d]);

  return (
    <section id="performance" className="py-20 bg-[#060a15] border-t border-[#172545]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div><span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Audited Alpha Records</span><h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Cumulative Performance</h2></div>
            <div className="flex items-center bg-[#0a101f] p-1 rounded-xl border border-[#172545] text-xs font-mono">
              {timeframes.map((t) => <button key={t} onClick={() => setTf(t)} className={`px-3 py-1.5 rounded-lg transition-all ${tf === t ? 'bg-cyan-400 text-black font-bold shadow-md' : 'text-slate-400 hover:text-white'}`}>{t}</button>)}
            </div>
          </div>
          <Card className="rounded-2xl p-4 sm:p-6 border border-[#172545]/90">
            <div className="flex flex-wrap items-center gap-6 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" /><span className="text-white font-bold">QuantMe Alpha</span></div>
              <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-emerald-400" /><span className="text-slate-400">NIFTY 50</span></div>
              <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-slate-500" /><span className="text-slate-400">S&P 500</span></div>
            </div>
            <div className="h-[340px] sm:h-[400px]">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index' }, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0a101f', borderColor: '#243763', borderWidth: 1, padding: 12, callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y.toFixed(1)} pts` } } }, scales: { x: { grid: { color: 'rgba(36,55,99,0.3)' }, ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } } }, y: { grid: { color: 'rgba(36,55,99,0.3)' }, ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 }, callback: (v) => v + ' pts' } } } }} />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-bold text-white font-mono">Quantitative Diagnostics</h3>
          <div className="grid grid-cols-2 gap-3">
            {metricsData.map((m, i) => <Card key={i} className="p-4 rounded-xl border border-[#172545]"><span className="text-[11px] font-mono text-slate-400 uppercase block">{m.label}</span><span className={`text-2xl font-mono font-extrabold ${m.color} mt-1 block`}>{m.value}</span><span className="text-[10px] text-slate-500 font-mono">{m.sub}</span></Card>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ EDGE ═══════════════════ */
/* ═══════════════════ TECHNOLOGICAL MOAT & ALPHA COMPOUNDING ENGINE ═══════════════════ */
function EdgeAndCalculatorSection() {
  const [capital, setCapital] = useState(50000); // Default ₹50,000, starts from ₹10,000
  const [timeUnit, setTimeUnit] = useState('months'); // 'months' | 'years'
  const [duration, setDuration] = useState(6); // Default 6 months
  const [profile, setProfile] = useState(0);

  const cagr = calcProfiles[profile].cagr;
  // Effective time horizon in years
  const timeInYears = timeUnit === 'months' ? duration / 12 : duration;
  const finalVal = capital * Math.pow(1 + cagr / 100, timeInYears);
  const benchFinal = capital * Math.pow(1 + BENCHMARK_CAGR, timeInYears);
  const gain = finalVal - capital;
  const pctGain = (gain / capital) * 100;
  const alpha = finalVal - benchFinal;

  // Handle switching unit
  const handleUnitSwitch = (unit) => {
    setTimeUnit(unit);
    if (unit === 'months') {
      setDuration(6);
    } else {
      setDuration(3);
    }
  };

  return (
    <section id="edge" className="py-24 border-t border-[#172545]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technological Moat & Projections"
          title="Engineered Execution & Alpha Compounding"
          sub="Our proprietary microsecond stack paired with interactive quantitative alpha simulation."
        />

        {/* 50/50 Equal-Width Symmetrical Grid with Balanced Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch mt-12">
          {/* LEFT COLUMN: Technological Moat (2x2 Grid of 4 Pillars) */}
          <div className="flex flex-col justify-between rounded-3xl p-6 sm:p-8 glass-panel border border-[#172545] shadow-2xl h-full space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#172545]/80">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  EXECUTION STACK
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Technological Moat
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
                Colo FPGA Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 grow">
              {edgePillars.map((p, i) => {
                const Icon = edgeIcons[p.icon];
                const bg = tagColors[p.color];
                return (
                  <Card key={i} hover className="p-4 sm:p-5 rounded-2xl border border-[#172545] flex flex-col justify-between bg-[#060a16]">
                    <div>
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg mb-3 ${bg}`}>
                        <Icon />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{p.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className={`mt-3 pt-3 border-t border-[#172545]/60 text-[10px] font-mono font-bold ${
                      p.color === 'amber'
                        ? 'text-amber-400'
                        : p.color === 'purple'
                        ? 'text-purple-400'
                        : p.color === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-cyan-400'
                    }`}>
                      {p.metric}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Simulated Compounding Calculator */}
          <div id="calculator" className="flex flex-col justify-between rounded-3xl p-6 sm:p-8 glass-panel border border-[#172545] shadow-2xl h-full space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#172545]/80">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  SIMULATOR
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Alpha Growth Calculator
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-[#0a101f] border border-[#172545] px-3 py-1 rounded-full shrink-0">
                Regime Adaptive
              </span>
            </div>

            {/* Sliders & Horizon Controls */}
            <div className="space-y-4">
              {/* 1. Investment Allocation Slider (Starting from ₹10,000) */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-[11px] font-mono text-slate-300 font-semibold">INVESTMENT ALLOCATION</label>
                  <span className="text-base font-mono font-bold text-cyan-400">{formatINR(capital)}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={5000000}
                  step={10000}
                  value={capital}
                  onChange={(e) => setCapital(+e.target.value)}
                  className="w-full h-2 bg-[#0a101f] rounded-lg cursor-pointer border border-[#172545]"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                  <span>₹10K</span>
                  <span>₹10L</span>
                  <span>₹25L</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* 2. Time Horizon with Months vs Years Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] font-mono text-slate-300 font-semibold">TIME HORIZON</label>
                    {/* Unit Switcher */}
                    <div className="flex items-center bg-[#050914] p-0.5 rounded-lg border border-[#172545] text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => handleUnitSwitch('months')}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          timeUnit === 'months'
                            ? 'bg-emerald-400 text-black font-bold shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Months (1-12)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUnitSwitch('years')}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          timeUnit === 'years'
                            ? 'bg-emerald-400 text-black font-bold shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Years (1-5)
                      </button>
                    </div>
                  </div>
                  <span className="text-base font-mono font-bold text-emerald-400">
                    {duration} {timeUnit === 'months' ? (duration === 1 ? 'Month' : 'Months') : (duration === 1 ? 'Year' : 'Years')}
                  </span>
                </div>

                {timeUnit === 'months' ? (
                  <>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      step={1}
                      value={duration}
                      onChange={(e) => setDuration(+e.target.value)}
                      className="w-full h-2 bg-[#0a101f] rounded-lg cursor-pointer border border-[#172545]"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                      <span>1M</span>
                      <span>3M</span>
                      <span>6M</span>
                      <span>9M</span>
                      <span>12M</span>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={duration}
                      onChange={(e) => setDuration(+e.target.value)}
                      className="w-full h-2 bg-[#0a101f] rounded-lg cursor-pointer border border-[#172545]"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                      <span>1Y</span>
                      <span>2Y</span>
                      <span>3Y</span>
                      <span>4Y</span>
                      <span>5Y</span>
                    </div>
                  </>
                )}
              </div>

              {/* 3. Strategy Profile Selection */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 font-semibold block mb-1.5">STRATEGY PROFILE</label>
                <div className="grid grid-cols-3 gap-2">
                  {calcProfiles.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setProfile(i)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        profile === i ? 'border-cyan-400 bg-cyan-400/10' : 'border-[#172545] bg-[#0a101f]'
                      }`}
                    >
                      <span className="block text-[11px] font-bold text-white">{p.label}</span>
                      <span className={`block text-[9px] font-mono mt-0.5 ${profile === i ? 'text-cyan-400' : 'text-slate-400'}`}>
                        {p.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Display */}
            <div className="bg-[#080e1c] rounded-2xl p-5 border border-[#172545]/90 space-y-3.5 mt-auto">
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Estimated Portfolio Value</span>
                <span className="text-3xl font-mono font-extrabold text-white mt-1 block">
                  {formatINR(finalVal)}
                </span>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  +{formatINR(gain)} (+{pctGain.toFixed(1)}%)
                </span>
              </div>

              <div className="space-y-1 pt-2.5 border-t border-[#172545]/60 text-[11px] font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Benchmark (14.2%):</span>
                  <span className="text-slate-300 font-semibold">{formatINR(benchFinal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Net Excess Alpha:</span>
                  <span className="text-cyan-400 font-bold">+{formatINR(alpha)}</span>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl block text-center hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
              >
                Inquire For Allocation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ ═══════════════════ */
function FaqSection() {
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader badge="Transparency" title="Frequently Asked Questions" />
      <div className="space-y-4">
        {faqData.map((f, i) => (
          <Card key={i} className="rounded-xl border border-[#172545] overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)} className="w-full p-5 text-left flex items-center justify-between font-semibold text-white hover:text-cyan-400 transition-colors"><span>{f.q}</span><FaChevronDown className={`text-xs transition-transform ${openIdx === i ? 'rotate-180' : ''}`} /></button>
            {openIdx === i && <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-[#172545]/40 pt-3">{f.a}</div>}
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ CONTACT ═══════════════════ */
function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [allocation, setAllocation] = useState(50000); // Seekbar from 10,000 to 1Cr

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      e.target.reset();
      setAllocation(50000);
    }, 900);
  };

  const info = [
    { Icon: FaEnvelope, bg: 'bg-cyan-500/10', color: 'text-cyan-400', label: 'OFFICIAL EMAIL', val: 'desk@quantmewealth.com' },
    { Icon: FaLocationDot, bg: 'bg-emerald-500/10', color: 'text-emerald-400', label: 'LOCATION', val: 'Bangalore' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#050811] border-t border-[#172545]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div><span className="text-xs font-mono font-bold text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-500/30">Institutional Access</span><h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">Connect With Our Quantitative Desk</h2><p className="text-slate-400 text-sm mt-3 leading-relaxed">Schedule a confidential strategy session, request live audit sheets, or explore custom algorithmic integration.</p></div>
          <div className="space-y-4 text-sm font-mono">
            {info.map((c, i) => <Card key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[#172545]"><div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center ${c.color}`}><c.Icon /></div><div><span className="text-xs text-slate-500 block">{c.label}</span><span className="text-slate-200 font-bold">{c.val}</span></div></Card>)}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#172545]/90 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2">Request Live Demo</h3>
            <p className="text-xs text-slate-400 mb-6">Fill in your information to schedule your live market software Demo.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">FULL NAME *</label><input type="text" required placeholder="e.g. Rajat Sharma" className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600" /></div>
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">EMAIL *</label><input type="email" required placeholder="rajat@office.com" className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">INVESTOR TYPE *</label><select className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-slate-300"><option>Retail / Individual Trader</option><option>High Net-Worth Individual</option><option>Family Office</option><option>Prop Trading Desk</option></select></div>
                {/* Allocation Seekbar starting from ₹10,000 to ₹1Cr */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-mono text-slate-300">ALLOCATION *</label>
                    <span className="text-xs font-mono font-bold text-cyan-400">{formatINR(allocation)}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={allocation}
                    onChange={(e) => setAllocation(+e.target.value)}
                    className="w-full h-2 bg-[#050811] rounded-lg cursor-pointer border border-[#172545] accent-cyan-400"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                    <span>₹10K</span>
                    <span>₹25L</span>
                    <span>₹50L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>
              </div>
              <div><label className="block text-xs font-mono text-slate-300 mb-1.5">NOTES</label><textarea rows={3} placeholder="Custom mandate, broker preference..." className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600" /></div>
              <button type="submit" disabled={submitting} className="w-full py-4 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center gap-2">{submitting ? <><FaSpinner className="animate-spin" /> Submitting...</> : <><FaPaperPlane className="text-xs" /> Submit Request</>}</button>
            </form>
            {success && (
              <div className="absolute inset-0 bg-[#070e1e]/95 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 border border-emerald-400">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/40"><FaCheck /></div>
                <h4 className="text-xl font-bold text-white">Request Received</h4>
                <p className="text-xs text-slate-400 max-w-md">Our senior desk will deliver the audited factbook to your email within 4 business hours.</p>
                <button onClick={() => setSuccess(false)} className="px-6 py-2.5 text-xs font-bold font-mono bg-emerald-400 text-black rounded-lg">Done</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ SHARED ═══════════════════ */
function SectionHeader({ badge, title, sub }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      {badge && <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-500/30">{badge}</span>}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">{title}</h2>
      {sub && <p className="text-slate-400 text-sm sm:text-base mt-3">{sub}</p>}
    </div>
  );
}
