import { useState, useMemo } from 'react';

const BENCHMARK_CAGR = 0.142; // 14.2%

const strategyProfiles = [
  { id: 'stat-arb', label: 'Stat-Arb', cagr: 28.4, sublabel: '28.4% CAGR' },
  { id: 'balanced', label: 'Balanced Alpha', cagr: 34.8, sublabel: '34.8% CAGR' },
  { id: 'hft', label: 'HFT Aggressive', cagr: 42.5, sublabel: '42.5% CAGR' },
];

export function useCalculator() {
  const [capital, setCapital] = useState(5000000);
  const [years, setYears] = useState(3);
  const [selectedProfile, setSelectedProfile] = useState(0);

  const selectedCAGR = strategyProfiles[selectedProfile].cagr;

  const results = useMemo(() => {
    const finalVal = capital * Math.pow(1 + selectedCAGR / 100, years);
    const benchmarkFinal = capital * Math.pow(1 + BENCHMARK_CAGR, years);
    const totalGain = finalVal - capital;
    const percentageGain = ((finalVal - capital) / capital) * 100;
    const excessAlpha = finalVal - benchmarkFinal;

    return {
      estimatedValue: finalVal,
      totalGain,
      percentageGain,
      benchmarkEstimate: benchmarkFinal,
      excessAlpha,
    };
  }, [capital, years, selectedCAGR]);

  return {
    capital,
    setCapital,
    years,
    setYears,
    selectedProfile,
    setSelectedProfile,
    strategyProfiles,
    results,
  };
}

export function formatINR(val) {
  return '₹' + Math.round(val).toLocaleString('en-IN');
}
