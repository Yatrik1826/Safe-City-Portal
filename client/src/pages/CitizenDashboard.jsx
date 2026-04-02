import { useState } from 'react';
import api from '../services/api.js';
import LocationPicker from '../components/LocationPicker.jsx';

const categories = ['harassment', 'theft', 'assault', 'stalking'];

export default function CitizenDashboard() {
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
      });
      setStatus('Incident submitted successfully.');
    } catch (err) {
      setStatus('Failed to submit incident.');
    }
  };

  const triggerPanic = async () => {
    try {
      const res = await api.post('/api/alerts/panic', {
        lat: Number(location.lat),
        lng: Number(location.lng),
        category,
        description,
      });
      setStatus(`Panic alert triggered. Unit assigned: ${res.data.assignedUnit?.name || 'Pending'}`);
    } catch (err) {
      setStatus('Failed to trigger panic alert.');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Citizen Safety Console</h2>
        <p className="text-sm text-steel">Quick access to alerts, reporting, and live safety support</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6">
        <LocationPicker value={location} onChange={setLocation} />
        <div className="panel-card p-6 space-y-4">
          <h3 className="font-display text-lg">Report or Trigger SOS</h3>
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
          <div className="flex gap-3">
            <button onClick={submitIncident} className="flex-1 bg-royal text-white rounded-xl py-2 font-semibold">
              Record Incident
            </button>
            <button onClick={triggerPanic} className="flex-1 bg-alert text-white rounded-xl py-2 font-semibold">
              Panic Button
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="panel-card p-5">
          <h3 className="font-display text-lg">Emergency Contacts</h3>
          <p className="text-sm text-steel mt-2">Police, women distress, fire brigade, medical.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/70 border border-sky px-3 py-1 text-xs">Women Distress</span>
            <span className="rounded-full bg-white/70 border border-sky px-3 py-1 text-xs">Police</span>
            <span className="rounded-full bg-white/70 border border-sky px-3 py-1 text-xs">Fire Brigade</span>
            <span className="rounded-full bg-white/70 border border-sky px-3 py-1 text-xs">Ambulance</span>
          </div>
        </div>
        <div className="panel-card p-5">
          <h3 className="font-display text-lg">Explore LiveSafe</h3>
          <p className="text-sm text-steel mt-2">Nearby police stations, hospitals, and safe zones.</p>
          <button className="mt-4 w-full bg-white border border-navy text-navy rounded-xl py-2 text-sm font-semibold">
            View Nearby Services
          </button>
        </div>
        <div className="panel-card p-5">
          <h3 className="font-display text-lg">Be Nirbhaya With</h3>
          <p className="text-sm text-steel mt-2">Share live location, SOS alert, and support tools.</p>
          <button className="mt-4 w-full bg-white border border-navy text-navy rounded-xl py-2 text-sm font-semibold">
            Enable Safety Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="panel-card p-5">
          <h3 className="font-display text-lg">Additional Features</h3>
          <ul className="mt-3 text-sm text-steel space-y-1">
            <li>Contact history</li>
            <li>Add trusted contacts</li>
            <li>Safety tips</li>
          </ul>
        </div>
        <div className="panel-card p-5">
          <h3 className="font-display text-lg">Chatbot Assistance</h3>
          <p className="text-sm text-steel mt-2">24/7 guidance and support resources.</p>
          <button className="mt-4 w-full bg-white border border-navy text-navy rounded-xl py-2 text-sm font-semibold">
            Open Assistant
          </button>
        </div>
        <div className="panel-card p-5">
          <h3 className="font-display text-lg">Safety Tips</h3>
          <p className="text-sm text-steel mt-2">Daily safety guidance and awareness prompts.</p>
          <button className="mt-4 w-full bg-white border border-navy text-navy rounded-xl py-2 text-sm font-semibold">
            View Tips
          </button>
        </div>
      </div>

      {status && <div className="panel-card p-4 text-sm text-navy">{status}</div>}
    </div>
  );
}
