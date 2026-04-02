import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/incidents?limit=50');
        setIncidents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Incident Intelligence Feed</h2>
        <p className="text-sm text-steel">Live ledger of reported and simulated incidents</p>
      </header>

      <div className="panel-card p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-steel">
              <tr>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Severity</th>
                <th className="text-left py-2">Location</th>
                <th className="text-left py-2">Reported</th>
                <th className="text-left py-2">Simulated</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident._id} className="border-t border-sky/60">
                  <td className="py-3 font-semibold text-navy">{incident.category}</td>
                  <td className="py-3">{incident.severity}</td>
                  <td className="py-3 text-steel">{incident.addressLabel || 'City Sector'}</td>
                  <td className="py-3">{new Date(incident.reportedAt).toLocaleString()}</td>
                  <td className="py-3">{incident.isSimulated ? 'Yes' : 'No'}</td>
                </tr>
              ))}
              {incidents.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-steel">
                    No incidents available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
