import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const tabs = [
  { key: 'open', label: 'Open' },
  { key: 'investigating', label: 'Assigned' },
  { key: 'resolved', label: 'Resolved' },
];

export default function AdminIncidents() {
  const [status, setStatus] = useState('open');
  const [incidents, setIncidents] = useState([]);
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const res = await api.get(`/api/incidents?status=${status}&limit=50`);
      setIncidents(res.data);
    } catch (err) {
      setMessage('Failed to load incidents');
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const assignUnit = async (id) => {
    try {
      const res = await api.put(`/api/incidents/${id}/assign`, {});
      setIncidents((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      setMessage('Unit assigned');
    } catch (err) {
      setMessage('Assign failed');
    }
  };

  const markResolved = async (id) => {
    try {
      const res = await api.put(`/api/incidents/${id}/status`, { status: 'resolved' });
      setIncidents((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      setMessage('Marked resolved');
    } catch (err) {
      setMessage('Resolve failed');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl">Incident Operations</h2>
        <p className="text-sm text-steel">Assign units, review descriptions, and close cases.</p>
      </header>

      <div className="panel-card p-4 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setStatus(t.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              status === t.key ? 'bg-royal text-white' : 'bg-white border border-sky text-navy'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {message && <div className="panel-card p-4 text-sm text-navy">{message}</div>}

      <div className="panel-card p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-steel">
            <tr>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Description</th>
              <th className="text-left py-2">Location</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Unit</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident._id} className="border-t border-sky/60 align-top">
                <td className="py-3 font-semibold capitalize text-navy">{incident.category}</td>
                <td className="py-3 max-w-sm">
                  <p className="text-steel">{incident.description || 'No description provided.'}</p>
                  <p className="text-xs text-steel mt-1">{new Date(incident.reportedAt).toLocaleString()}</p>
                </td>
                <td className="py-3 text-steel">{incident.addressLabel || 'City Sector'}</td>
                <td className="py-3 capitalize text-steel">{incident.status}</td>
                <td className="py-3 text-steel">{incident.assignedUnit?.name || '--'}</td>
                <td className="py-3 space-x-2">
                  {incident.status === 'open' && (
                    <button
                      onClick={() => assignUnit(incident._id)}
                      className="bg-royal text-white rounded-lg px-3 py-1 text-xs"
                    >
                      Assign
                    </button>
                  )}
                  {incident.status !== 'resolved' && (
                    <button
                      onClick={() => markResolved(incident._id)}
                      className="bg-white border border-navy text-navy rounded-lg px-3 py-1 text-xs"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-steel">
                  No incidents for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
