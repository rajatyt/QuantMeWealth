import { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

export default function MiniChart() {
  const data = {
    labels: ['09:15', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '15:30'],
    datasets: [
      {
        data: [100, 102.4, 105.1, 104.8, 108.5, 112.1, 114.6, 118.2],
        borderColor: '#00f0ff',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="h-24 w-full">
      <Line data={data} options={options} />
    </div>
  );
}
