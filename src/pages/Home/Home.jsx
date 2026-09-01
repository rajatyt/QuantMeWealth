import { useState, useEffect, useMemo } from 'react';
import { FaBolt, FaChartColumn, FaArrowTrendUp, FaArrowTrendDown, FaMicrochip, FaChevronDown, FaPaperPlane, FaSpinner, FaCheck, FaBoltLightning, FaBrain, FaShieldHalved, FaCloudArrowUp, FaArrowUpRightFromSquare, FaXmark, FaEnvelope, FaLocationDot, FaShieldHeart } from 'react-icons/fa6';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';

import { useStocks } from '../../hooks/useStocks';
import { tickerSymbols, strategies, strategyFilters, performanceData, timeframes, metricsData, trustRibbonStats, edgePillars, faqData, calcProfiles } from '../../data/mockData';
import { formatINR, formatPrice, getLiveClock } from '../../utils/helpers';
import { BENCHMARK_CAGR } from '../../utils/constants';
import Card from '../../components/common/Card';
import './Home.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

const edgeIcons = { bolt: FaBoltLightning, brain: FaBrain, shield: FaShieldHalved, cloud: FaCloudArrowUp };
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
      <StrategiesSection />
      <PerformanceSection />
      <EdgeSection />
      <CalculatorSection />
      <FaqSection />
      <ContactSection />
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
            {isLiveApi ? 'LIVE FEED (RAPIDAPI)' : 'LIVE MARKETS'}
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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">Statistical Arbitrage & HFT Systems 3.0</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Algorithmic Precision. <br /><span className="gradient-text-cyan">Uncorrelated Alpha</span> <br />For Institutional Capital.
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              QuantMeWealth designs mathematical models, low-latency execution pipelines, and risk-parity frameworks engineered to extract consistent yields across equity, derivative, and global macro markets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#strategies" className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-3"><span>Deploy Capital</span><FaBolt className="text-xs" /></a>
              <a href="#performance" className="w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-200 glass-panel hover:bg-[#0f172e] hover:text-white rounded-xl transition-all flex items-center justify-center gap-2.5"><FaChartColumn className="text-cyan-400" /><span>View Verified Track Record</span></a>
            </div>
            <div className="pt-6 border-t border-[#172545]/50 grid grid-cols-3 gap-4 text-left">
              <div><div className="text-2xl sm:text-3xl font-bold font-mono text-white">₹1,850+ Cr</div><div className="text-[11px] text-slate-400">Assets Monitored</div></div>
              <div><div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">2.85</div><div className="text-[11px] text-slate-400">3-Yr Sharpe Ratio</div></div>
              <div><div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">&lt; 0.8ms</div><div className="text-[11px] text-slate-400">Colo Execution Latency</div></div>
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
                    <span className="ml-2 text-xs font-mono text-slate-400">QuantCore_v4.8 :: NSE/BSE Colo</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
                </div>
                <div className="bg-[#050914] rounded-xl p-4 border border-[#172545] font-mono text-xs space-y-2.5">
                  <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-[#172545]/60">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5"><FaMicrochip className="text-cyan-400" /> ALPHA ENGINE ACTIVE</span>
                    <span className="text-[10px] text-cyan-400">{clock}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="bg-[#0a101f]/80 p-2 rounded border border-[#172545]/50"><span className="text-slate-400 text-[10px] block">Active Positions</span><span className="text-white font-bold text-sm">48 Pairs</span></div>
                    <div className="bg-[#0a101f]/80 p-2 rounded border border-[#172545]/50"><span className="text-slate-400 text-[10px] block">Net Market Delta</span><span className="text-emerald-400 font-bold text-sm">+0.002 (Neutral)</span></div>
                  </div>
                  <div className="pt-2">
                    <div className="text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center justify-between"><span>Live Execution Feed</span><span className="text-cyan-400 text-[9px] animate-pulse">● STREAMING</span></div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between bg-[#0a101f]/90 px-2.5 py-1.5 rounded border-l-2 border-emerald-400"><span className="text-slate-300">ARB: NIFTY 24900 CE / PE Synthetic</span><span className="text-emerald-400 font-semibold">+₹14,200</span></div>
                      <div className="flex items-center justify-between bg-[#0a101f]/90 px-2.5 py-1.5 rounded border-l-2 border-cyan-400"><span className="text-slate-300">MOM: RELIANCE Micro-structure Fill</span><span className="text-cyan-400 font-semibold">0.62ms</span></div>
                      <div className="flex items-center justify-between bg-[#0a101f]/90 px-2.5 py-1.5 rounded border-l-2 border-emerald-400"><span className="text-slate-300">VOL: BANKNIFTY Straddle Skew Arb</span><span className="text-emerald-400 font-semibold">+₹28,650</span></div>
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

/* ═══════════════════ PERFORMANCE ═══════════════════ */
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
function EdgeSection() {
  return (
    <section id="edge" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Technological Moat" title="Built for Microsecond Alpha Extraction" sub="Our proprietary stack combines modern hardware acceleration, predictive ML models, and strict risk guardrails." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {edgePillars.map((p, i) => { const Icon = edgeIcons[p.icon]; const bg = tagColors[p.color]; return (
            <Card key={i} hover className="p-6 rounded-2xl border border-[#172545]">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl mb-5 ${bg}`}><Icon /></div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              <div className={`mt-4 pt-4 border-t border-[#172545]/60 text-[11px] font-mono ${p.color === 'amber' ? 'text-amber-400' : p.color === 'purple' ? 'text-purple-400' : p.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{p.metric}</div>
            </Card>
          ); })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CALCULATOR ═══════════════════ */
function CalculatorSection() {
  const [capital, setCapital] = useState(5000000);
  const [years, setYears] = useState(3);
  const [profile, setProfile] = useState(0);
  const cagr = calcProfiles[profile].cagr;
  const finalVal = capital * Math.pow(1 + cagr / 100, years);
  const benchFinal = capital * Math.pow(1 + BENCHMARK_CAGR, years);
  const gain = finalVal - capital;
  const pctGain = (gain / capital) * 100;
  const alpha = finalVal - benchFinal;

  return (
    <section id="calculator" className="py-20 bg-[#060a14] border-y border-[#172545]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Simulated Compounding Engine" title="Calculate Potential Alpha Growth" sub="Simulate returns based on historical backtested and live out-of-sample data across market regimes." />
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-3xl p-6 sm:p-10 border border-[#172545] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div><div className="flex justify-between mb-2"><label className="text-xs font-mono text-slate-300 font-semibold">INVESTMENT ALLOCATION</label><span className="text-lg font-mono font-bold text-cyan-400">{formatINR(capital)}</span></div><input type="range" min={1000000} max={50000000} step={500000} value={capital} onChange={(e) => setCapital(+e.target.value)} className="w-full h-2 bg-[#0a101f] rounded-lg cursor-pointer border border-[#172545]" /><div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1"><span>₹10L</span><span>₹2.5Cr</span><span>₹5Cr</span></div></div>
                <div><div className="flex justify-between mb-2"><label className="text-xs font-mono text-slate-300 font-semibold">TIME HORIZON</label><span className="text-lg font-mono font-bold text-emerald-400">{years} Year{years > 1 ? 's' : ''}</span></div><input type="range" min={1} max={5} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className="w-full h-2 bg-[#0a101f] rounded-lg cursor-pointer border border-[#172545]" /><div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1"><span>1Y</span><span>3Y</span><span>5Y</span></div></div>
                <div><label className="text-xs font-mono text-slate-300 font-semibold block mb-2">STRATEGY PROFILE</label><div className="grid grid-cols-3 gap-2.5">{calcProfiles.map((p, i) => <button key={p.id} onClick={() => setProfile(i)} className={`p-3 rounded-xl border text-left transition-all ${profile === i ? 'border-cyan-400 bg-cyan-400/10' : 'border-[#172545] bg-[#0a101f]'}`}><span className="block text-xs font-bold text-white">{p.label}</span><span className={`block text-[10px] font-mono mt-0.5 ${profile === i ? 'text-cyan-400' : 'text-slate-400'}`}>{p.sub}</span></button>)}</div></div>
              </div>
              <div className="lg:col-span-5 bg-[#080e1c] rounded-2xl p-6 border border-[#172545]/90 text-center space-y-5">
                <div><span className="text-xs font-mono text-slate-400 uppercase block">Estimated Portfolio Value</span><span className="text-3xl sm:text-4xl font-mono font-extrabold text-white mt-1 block">{formatINR(finalVal)}</span><span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">+{formatINR(gain)} (+{pctGain.toFixed(1)}%)</span></div>
                <div className="space-y-2 pt-4 border-t border-[#172545]/60 text-xs font-mono text-left"><div className="flex justify-between text-slate-400"><span>Benchmark Estimate:</span><span className="text-slate-300 font-semibold">{formatINR(benchFinal)}</span></div><div className="flex justify-between text-slate-400"><span>Net Excess Alpha:</span><span className="text-cyan-400 font-bold">+{formatINR(alpha)}</span></div></div>
                <a href="#contact" className="w-full py-3 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl block hover:opacity-95">Inquire For Allocation</a>
              </div>
            </div>
          </Card>
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
  const handleSubmit = (e) => { e.preventDefault(); setSubmitting(true); setTimeout(() => { setSubmitting(false); setSuccess(true); e.target.reset(); }, 900); };
  const info = [
    { Icon: FaEnvelope, bg: 'bg-cyan-500/10', color: 'text-cyan-400', label: 'INSTITUTIONAL DESK', val: 'desk@quantmewealth.com' },
    { Icon: FaLocationDot, bg: 'bg-emerald-500/10', color: 'text-emerald-400', label: 'GLOBAL HUBS', val: 'BKC, Mumbai • Wall St, NY • Marina Bay, SG' },
    { Icon: FaShieldHeart, bg: 'bg-purple-500/10', color: 'text-purple-400', label: 'SECURITY', val: 'SOC2 Certified • 256-Bit SSL' },
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
            <h3 className="text-xl font-bold text-white mb-2">Request Strategy Whitepaper & Consultation</h3>
            <p className="text-xs text-slate-400 mb-6">Fill in your information to receive our audited quarterly deck.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">FULL NAME *</label><input type="text" required placeholder="e.g. Rajat Sharma" className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600" /></div>
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">EMAIL *</label><input type="email" required placeholder="rajat@office.com" className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">INVESTOR TYPE *</label><select className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-slate-300"><option>High Net-Worth Individual</option><option>Family Office</option><option>Prop Trading Desk</option><option>Institutional Fund</option></select></div>
                <div><label className="block text-xs font-mono text-slate-300 mb-1.5">ALLOCATION *</label><select className="w-full px-4 py-3 rounded-xl bg-[#050811]/80 border border-[#172545] focus:border-cyan-400 focus:outline-none text-sm text-slate-300"><option>₹25L – ₹1Cr</option><option>₹1Cr – ₹5Cr</option><option>₹5Cr – ₹25Cr</option><option>₹25Cr+ ($3M+)</option></select></div>
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
