import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import MapPanel from '../components/MapPanel.jsx';
import AnalyticsCharts from '../components/AnalyticsCharts.jsx';
import ReportExport from '../components/ReportExport.jsx';
import AdminFilters from '../components/AdminFilters.jsx';
import InsightsPanel from '../components/InsightsPanel.jsx';
import ZoneLeaderboard from '../components/ZoneLeaderboard.jsx';
import TriageQueue from '../components/TriageQueue.jsx';
import DispatchConsole from '../components/DispatchConsole.jsx';
import api from '../services/api.js';
import { connectSocket } from '../services/socket.js';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [heatmap, setHeatmap] = useState([]);
  const [latestCount, setLatestCount] = useState(0);
  const [areas, setAreas] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [dispatches, setDispatches] = useState([]);
  const [timeWindows, setTimeWindows] = useState(null);
  const [filters, setFilters] = useState({ range: '30', category: 'all' });
  const [actionMessage, setActionMessage] = useState('');

  const load = async () => {
    try {
      const fromDate = new Date(Date.now() - Number(filters.range) * 24 * 60 * 60 * 1000).toISOString();
      const query = new URLSearchParams();
      query.set('from', fromDate);
      if (filters.category !== 'all') query.set('category', filters.category);

      const [summaryRes, heatmapRes, areaRes, incidentRes, dispatchRes, windowRes] = await Promise.all([
        api.get(`/api/analytics/summary?${query.toString()}`),
        api.get(`/api/incidents/heatmap?${query.toString()}`),
        api.get(`/api/analytics/area-risk?${query.toString()}`),
        api.get('/api/incidents?limit=8'),
        api.get('/api/incidents?status=investigating&limit=5'),
        api.get('/api/predict/time-windows'),
      ]);
      setSummary(summaryRes.data);
      setHeatmap(heatmapRes.data.slice(0, 200));
      setLatestCount(summaryRes.data?.countsByCategory?.reduce((a, c) => a + c.count, 0) || 0);
      setAreas(areaRes.data.areas || []);
      setIncidents(incidentRes.data);
      setDispatches(dispatchRes.data);
      setTimeWindows(windowRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [filters]);

  useEffect(() => {
    const socket = connectSocket();
    socket.on('incident:new', (incident) => {
      setHeatmap((prev) => [
        { lng: incident.location.coordinates[0], lat: incident.location.coordinates[1], weight: incident.severity },
        ...prev,
      ].slice(0, 200));
      setLatestCount((prev) => prev + 1);
      setIncidents((prev) => [incident, ...prev].slice(0, 8));
    });

    socket.on('incident:update', (incident) => {
      setIncidents((prev) => prev.map((i) => (i._id === incident._id ? incident : i)));
      if (incident.status === 'investigating') {
        setDispatches((prev) => [incident, ...prev.filter((i) => i._id !== incident._id)].slice(0, 5));
      } else {
        setDispatches((prev) => prev.filter((i) => i._id !== incident._id));
      }
    });

    return () => {
      socket.off('incident:new');
      socket.off('incident:update');
    };
  }, []);

  const handleAssign = async (id) => {
    try {
      const res = await api.put(`/api/incidents/${id}/assign`, {});
      setIncidents((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      setDispatches((prev) => [res.data, ...prev.filter((i) => i._id !== id)].slice(0, 5));
      setActionMessage('Unit assigned successfully.');
    } catch (err) {
      setActionMessage('Failed to assign unit.');
      console.error(err);
    }
  };

  const handleResolve = async (id) => {
    try {
      const res = await api.put(`/api/incidents/${id}/status`, { status: 'resolved' });
      setIncidents((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      setDispatches((prev) => prev.filter((i) => i._id !== id));
      setActionMessage('Incident marked as resolved.');
    } catch (err) {
      setActionMessage('Failed to resolve incident.');
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <section className="panel-card p-6 bg-gradient-to-br from-white to-sky">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl">City Safety Overview</h3>
            <p className="text-sm text-steel">Enterprise monitoring and intelligence.</p>
          </div>
          <ReportExport />
        </div>
      </section>

      <AdminFilters value={filters} onChange={setFilters} />

      {actionMessage && (
        <div className="panel-card p-4 text-sm text-navy">{actionMessage}</div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Incidents" value={latestCount} trend="Live" tone="royal" />
        <StatCard title="High Risk Zones" value={areas.length} trend="Updated" tone="navy" />
        <StatCard title="System Health" value="Stable" trend="Operational" tone="royal" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <MapPanel points={heatmap} />
          <AnalyticsCharts summary={summary} />
        </div>
        <div className="space-y-6">
          <ZoneLeaderboard areas={areas} />
          <InsightsPanel summary={summary} timeWindows={timeWindows} />
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TriageQueue incidents={incidents} onAssign={handleAssign} onResolve={handleResolve} />
        <DispatchConsole incidents={dispatches} />
      </section>
    </div>
  );
}
