import { useEffect, useState } from 'react';
import AlertList from '../components/AlertList.jsx';
import api from '../services/api.js';

const statusTone = (status) =>
  status === 'pending' ? 'bg-amber-100 text-amber-700' : status === 'dispatched' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700';

export default function OfficerDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [alertsRes, incidentsRes] = await Promise.all([
        api.get('/api/alerts?limit=10'),
        api.get('/api/incidents?limit=10'),
      ]);
      setAlerts(alertsRes.data);
      setIncidents(incidentsRes.data);
    };
    load().catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Officer Operations Desk</h2>
        <p className="text-sm text-steel">Live alerts and immediate incident feed</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6">
        <AlertList alerts={alerts} />
        <div className="panel-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg">Recent Incidents</h3>
            <span className="text-xs text-steel">Last 10</span>
          </div>
          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
            {incidents.map((incident) => (
              <div key={incident._id} className="rounded-xl border border-sky px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy capitalize">{incident.category}</p>
                  <span className={`text-xs rounded-full px-2 py-1 ${statusTone(incident.status)}`}>{incident.status}</span>
                </div>
                <p className="text-xs text-steel mt-1">{incident.addressLabel || 'City Sector'}</p>
                <p className="text-xs text-steel">{new Date(incident.reportedAt).toLocaleString()}</p>
              </div>
            ))}
            {incidents.length === 0 && <p className="text-sm text-steel">No incidents available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
