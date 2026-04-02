import { useState } from 'react';
import api from '../../services/api.js';
import LocationPicker from '../../components/LocationPicker.jsx';

const categories = ['harassment', 'theft', 'assault', 'stalking'];

export default function RecordIncident() {
  const [category, setCategory] = useState('harassment');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ lat: 28.613, lng: 77.209, label: 'Central Zone' });
  const [status, setStatus] = useState(null);

  const submitIncident = async () => {
    try {
      await api.post('/api/incidents', {
        category,
        description,
        lat: Number(location.lat),
        lng: Number(location.lng),
        addressLabel: location.label,
      });
      setStatus('Incident submitted successfully.');
    } catch (err) {
      setStatus('Failed to submit incident.');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Record Incident</h2>
        <p className="text-sm text-steel">Log an incident with location and description.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6">
        <LocationPicker value={location} onChange={setLocation} />
        <div className="panel-card p-6 space-y-4">
          <div>
            <label className="text-sm text-steel">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-steel">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
              rows="4"
              placeholder="Add any important details (optional)"
            />
          </div>
          <button onClick={submitIncident} className="w-full bg-royal text-white rounded-xl py-2 font-semibold">
            Submit Incident
          </button>
        </div>
      </div>

      {status && <div className="panel-card p-4 text-sm text-navy">{status}</div>}
    </div>
  );
}
