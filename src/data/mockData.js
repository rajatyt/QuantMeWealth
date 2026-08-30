// ========== TICKER SYMBOLS ==========
export const tickerSymbols = [
  { id: 'NIFTY', label: 'NIFTY 50', base: 24862.40, decimals: 2, spread: 4.5, change: '+0.74%', up: true },
  { id: 'BANKNIFTY', label: 'BANK NIFTY', base: 53180.15, decimals: 2, spread: 8.0, change: '+1.18%', up: true },
  { id: 'SP500', label: 'S&P 500', base: 5638.20, decimals: 2, spread: 1.2, change: '+0.52%', up: true },
  { id: 'NASDAQ', label: 'NASDAQ 100', base: 19890.75, decimals: 2, spread: 3.5, change: '+0.89%', up: true },
  { id: 'BTC', label: 'BTC/USD', base: 64420.00, decimals: 2, spread: 15.0, change: '+2.45%', up: true },
  { id: 'INDIAVIX', label: 'INDIA VIX', base: 12.35, decimals: 2, spread: 0.05, change: '-3.85%', up: false },
  { id: 'GOLD', label: 'GOLD (10g)', base: 72480, decimals: 0, spread: 12, change: '+0.41%', up: true },
  { id: 'CRUDE', label: 'CRUDE OIL', base: 76.45, decimals: 2, spread: 0.15, change: '-0.65%', up: false },
];

// ========== STRATEGIES ==========
export const strategies = [
  {
    id: 'alphanexus', name: 'AlphaNexus Arbitrage', category: 'arbitrage',
    tag: 'STAT-ARB // DELTA NEUTRAL', tagColor: 'cyan', badge: 'NSE Colo',
    desc: 'Co-integrated pairs trading and cash-futures basket arbitrage capturing transient mispricings with strict risk neutrality.',
    cagr: '+28.4%', sharpe: '3.12', maxDd: '-2.8%',
    modalType: 'Statistical Arbitrage & Pairs Trading', universe: 'NSE/BSE Equities & Futures',
    risk: 'Low (Market Neutral)', minCap: '50 Lakhs / $60K',
    algo: 'Pairs cointegration using Engle-Granger two-step and Johansen tests with sub-second execution.',
  },
  {
    id: 'volmatrix', name: 'VolMatrix Dynamic Hedger', category: 'volatility',
    tag: 'VOLATILITY SURFACE', tagColor: 'purple', badge: 'Gamma Hedged',
    desc: 'Exploits implied volatility risk premium, term structure skews, and real-time gamma imbalances on Index Options.',
    cagr: '+36.2%', sharpe: '2.74', maxDd: '-4.5%',
    modalType: 'Options Volatility Surface Arbitrage', universe: 'NIFTY & BANKNIFTY Options',
    risk: 'Moderate (Hedging Active)', minCap: '1 Crore / $120K',
    algo: 'Continuous delta-gamma neutral adjustment with dynamic Bayesian volatility forecasting.',
  },
  {
    id: 'deeporder', name: 'DeepOrder Flow HFT', category: 'hft',
    tag: 'ULTRA-HFT // LEVEL 3', tagColor: 'emerald', badge: '< 250\u00b5s',
    desc: 'Microsecond limit order book queue position predictor analyzing tick volume pressure and passive order replenishment.',
    cagr: '+44.1%', sharpe: '3.88', maxDd: '-1.9%',
    modalType: 'High-Frequency Order Book Microstructure', universe: 'NSE Equity Derivatives L3',
    risk: 'Very Low (Sub-second holding)', minCap: '2.5 Crore / $300K',
    algo: 'FPGA-accelerated queue position modeling with microsecond order cancellation logic.',
  },
  {
    id: 'trendpulse', name: 'TrendPulse Macro Engine', category: 'momentum',
    tag: 'CROSS-ASSET MOMENTUM', tagColor: 'amber', badge: 'Multi-Market',
    desc: 'Adaptive regime-switching trend follower scanning multi-timeframe breakout patterns across equities, commodities, and FX.',
    cagr: '+31.6%', sharpe: '2.42', maxDd: '-5.6%',
    modalType: 'Systematic Cross-Asset Trend Following', universe: 'Indices, Gold, Crude, FX',
    risk: 'Moderate', minCap: '25 Lakhs / $30K',
    algo: 'Multi-horizon momentum filters combined with automated volatility scaling to control downside.',
  },
  {
    id: 'macroquant', name: 'MacroQuant Dispersion', category: 'arbitrage',
    tag: 'INDEX DISPERSION', tagColor: 'cyan', badge: 'Correlation Arb',
    desc: 'Trades implied vs realized correlation between Index options and single-stock constituent options baskets.',
    cagr: '+26.9%', sharpe: '2.95', maxDd: '-3.2%',
    modalType: 'Correlation & Volatility Dispersion Trading', universe: 'NIFTY Top 20 Stocks & Index',
    risk: 'Low-Medium', minCap: '1 Crore / $120K',
    algo: 'Short index volatility against long individual component basket volatility with dynamic vega weighting.',
  },
  {
    id: 'regimeshift', name: 'RegimeShift Asymmetric', category: 'volatility',
    tag: 'ASYMMETRIC ALPHA', tagColor: 'rose', badge: 'Tail-Hedged',
    desc: 'Convex payout engine monetizing extreme market stress events while generating steady base yield during calm regimes.',
    cagr: '+29.8%', sharpe: '2.68', maxDd: '-2.4%',
    modalType: 'Convex Tail Risk Hedging & Yield Generation', universe: 'Global Multi-Asset Derivatives',
    risk: 'Low (Tail Protection)', minCap: '75 Lakhs / $90K',
    algo: 'Systematic out-of-the-money put spreads financed through calendar term structure premiums.',
  },
];

export const strategyFilters = [
  { key: 'all', label: 'All Models' },
  { key: 'arbitrage', label: 'Statistical Arbitrage' },
  { key: 'volatility', label: 'Volatility & Options' },
  { key: 'momentum', label: 'Trend Momentum' },
  { key: 'hft', label: 'High Frequency (HFT)' },
];

// ========== PERFORMANCE DATA ==========
export const performanceData = {
  '1M': { labels: ['Day 1','Day 5','Day 10','Day 15','Day 20','Day 25','Day 30'], alpha: [100,101.8,103.2,102.7,104.9,106.1,107.5], nifty: [100,100.4,101.1,99.8,100.8,101.5,102.1], sp: [100,99.7,100.3,100.8,101.2,100.9,101.4] },
  '6M': { labels: ['M1','M2','M3','M4','M5','M6'], alpha: [100,106.5,112.8,115.4,120.9,128.2], nifty: [100,102.1,104.8,103.2,106.4,108.9], sp: [100,101.5,103.8,104.5,105.8,107.4] },
  '1Y': { labels: ['Q1','Q2','Q3','Q4'], alpha: [100,112.4,126.8,142.5], nifty: [100,104.5,109.1,114.8], sp: [100,103.8,108.2,112.5] },
  '3Y': { labels: ['2023 Q1','2023 Q3','2024 Q1','2024 Q3','2025 Q1','2025 Q3','2026 Q1'], alpha: [100,124.5,156.8,189.2,228.4,276.1,328.5], nifty: [100,109.2,118.4,131.2,142.8,154.5,168.2], sp: [100,108.1,116.5,126.4,138.1,148.9,159.4] },
  'ALL': { labels: ['2021','2022','2023','2024','2025','2026'], alpha: [100,138.2,194.5,272.8,384.2,518.6], nifty: [100,104.2,124.8,152.1,178.6,210.4], sp: [100,82.5,104.2,129.5,158.4,188.9] },
};

export const timeframes = ['1M', '6M', '1Y', '3Y', 'ALL'];

// ========== METRICS ==========
export const metricsData = [
  { label: 'CAGR (Annualized)', value: '+34.8%', color: 'text-emerald-400', sub: 'Benchmark: +14.2%' },
  { label: 'Sharpe Ratio', value: '2.85', color: 'text-cyan-400', sub: 'Rf Rate = 6.8%' },
  { label: 'Sortino Ratio', value: '3.92', color: 'text-emerald-400', sub: 'Downside risk filtered' },
  { label: 'Max Drawdown', value: '-4.8%', color: 'text-rose-400', sub: 'Benchmark DD: -18.4%' },
  { label: 'Calmar Ratio', value: '7.25', color: 'text-cyan-400', sub: 'Return/Max Drawdown' },
  { label: 'Market Beta', value: '0.11', color: 'text-purple-400', sub: 'Zero Market Correlation' },
];

export const trustRibbonStats = [
  { value: '\u20b95,200+', suffix: 'Cr', color: 'text-cyan-400', label: 'Annual Traded Volume' },
  { value: '74.8', suffix: '%', color: 'text-emerald-400', label: 'Historical Win Ratio' },
  { value: '4.8', suffix: '%', color: 'text-cyan-400', label: 'Historical Max Drawdown' },
  { value: '99.99', suffix: '%', color: 'text-purple-400', label: 'Execution Uptime SLA' },
];

// ========== EDGE PILLARS ==========
export const edgePillars = [
  { icon: 'bolt', color: 'cyan', title: 'Sub-Millisecond Engine', desc: 'Custom C++20 and Rust kernels executing directly on FPGA network interface cards inside exchange co-location facilities.', metric: '< 0.8ms Tick-to-Trade' },
  { icon: 'brain', color: 'emerald', title: 'Non-Linear ML Models', desc: 'Continuous training on over 3.2TB of daily order-book snapshots, options Greeks, dark liquidity, and cross-market flow signals.', metric: 'Bayesian Regime Detection' },
  { icon: 'shield', color: 'purple', title: 'Real-Time Risk Parity', desc: 'Hardware kill-switches, dynamic VaR thresholds, automated gamma hedge re-balancing, and non-correlated cross-asset weighting.', metric: 'Automated Circuit Breakers' },
  { icon: 'cloud', color: 'amber', title: 'Non-Custodial APIs', desc: 'Capital remains securely in your institutional or broker account. Our execution engine connects via secure encrypted API keys.', metric: '100% Custodial Control' },
];

// ========== FAQ ==========
export const faqData = [
  { q: 'How does capital custody work? Do I transfer funds to QuantMeWealth?', a: 'No. QuantMeWealth operates on a strictly non-custodial model. Your capital resides exclusively in your own institutional or preferred brokerage account (e.g. Zerodha, Interactive Brokers, Motilal Oswal, Finvasia). Our algorithms execute trades via encrypted, zero-withdrawal API tokens.' },
  { q: 'What is the minimum capital requirement to deploy?', a: 'Due to exchange margin requirements and multi-leg risk parity sizing, our retail client pool starts at \u20b925 Lakhs (~$30,000 USD). Institutional and HNW individual bespoke portfolios start at \u20b91 Crore+ (~$120,000 USD).' },
  { q: 'How do your algorithms handle sudden market flash crashes?', a: 'All strategies are embedded with automated hardware and software circuit breakers. If market volatility or portfolio delta exceeds preset Value-at-Risk (VaR) bands, the engine instantly neutralizes open exposures or transitions into protective gamma-long tail hedges.' },
  { q: 'What is the fee structure for managed strategies?', a: 'We align directly with our partners through a standard quantitative model: 0% to 1.5% management fee and a 15-20% performance fee with a strict high-water mark. We only profit when your portfolio exceeds previous all-time peaks.' },
];

// ========== CALCULATOR PROFILES ==========
export const calcProfiles = [
  { id: 'stat-arb', label: 'Stat-Arb', cagr: 28.4, sub: '28.4% CAGR' },
  { id: 'balanced', label: 'Balanced Alpha', cagr: 34.8, sub: '34.8% CAGR' },
  { id: 'hft', label: 'HFT Aggressive', cagr: 42.5, sub: '42.5% CAGR' },
];
