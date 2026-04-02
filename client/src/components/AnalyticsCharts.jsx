import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function AnalyticsCharts({ summary }) {
  const categories = summary?.countsByCategory || [];
  const hourly = summary?.hourlyTrend || [];

  const doughnutData = {
    labels: categories.map((c) => c._id),
    datasets: [
      {
        data: categories.map((c) => c.count),
        backgroundColor: ['#164C8A', '#4C9AFF', '#E53E3E', '#F6AD55'],
      },
    ],
  };

  const lineData = {
    labels: hourly.map((h) => `${h._id}:00`),
    datasets: [
      {
        label: 'Incidents per hour',
        data: hourly.map((h) => h.count),
        borderColor: '#164C8A',
        backgroundColor: 'rgba(22,76,138,0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="panel-card p-5">
        <h3 className="font-display text-lg">Category Mix</h3>
        <div className="mt-4 h-56">
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="panel-card p-5">
        <h3 className="font-display text-lg">Hourly Trend</h3>
        <div className="mt-4 h-56">
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}
