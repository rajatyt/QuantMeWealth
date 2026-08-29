import { useMemo } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { performanceData } from '../../data/performanceData';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

export default function PerformanceChart({ timeframe }) {
  const currentData = performanceData[timeframe] || performanceData['3Y'];

  const chartData = useMemo(
    () => ({
      labels: currentData.labels,
      datasets: [
        {
          label: 'QuantMe Alpha Fund',
          data: currentData.alpha,
          borderColor: '#00f0ff',
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return null;
            const grad = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
            grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
            return grad;
          },
          borderWidth: 3,
          pointBackgroundColor: '#00f0ff',
          pointBorderColor: '#091021',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.35,
          fill: true,
        },
        {
          label: 'NIFTY 50 Benchmark',
          data: currentData.nifty,
          borderColor: '#10b981',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          tension: 0.35,
          fill: false,
        },
        {
          label: 'S&P 500 Index',
          data: currentData.sp,
          borderColor: '#64748b',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.35,
          fill: false,
        },
      ],
    }),
    [currentData]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0a101f',
        borderColor: '#243763',
        borderWidth: 1,
        titleFont: { family: 'JetBrains Mono', size: 12 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 12,
        callbacks: {
          label: (context) =>
            ` ${context.dataset.label}: ${context.parsed.y.toFixed(1)} pts (+${(
              context.parsed.y - 100
            ).toFixed(1)}%)`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(36, 55, 99, 0.3)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } },
      },
      y: {
        grid: { color: 'rgba(36, 55, 99, 0.3)' },
        ticks: {
          color: '#94a3b8',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (value) => value + ' pts',
        },
      },
    },
  };

  return (
    <div className="relative h-[340px] sm:h-[400px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
