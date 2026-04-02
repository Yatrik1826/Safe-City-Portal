import { useState } from 'react';
import api from '../../services/api.js';
import LocationPicker from '../../components/LocationPicker.jsx';

export default function PanicButton() {
  const [location, setLocation] = useState({ lat: 28.613, lng: 77.209, label: 'Central Zone' });
  const [status, setStatus] = useState(null);

  const triggerPanic = async () => {
    try {
      const res = await api.post('/api/alerts/panic', {
        lat: Number(location.lat),
        lng: Number(location.lng),
        category: 'harassment',
        description: 'Emergency SOS triggered from citizen app.',
      });
      setStatus(`Panic alert triggered. Unit assigned: ${res.data.assignedUnit?.name || 'Pending'}`);
    } catch (err) {
      setStatus('Failed to trigger panic alert.');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Panic Button</h2>
        <p className="text-sm text-steel">Trigger instant SOS with your current location.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6">
        <LocationPicker value={location} onChange={setLocation} />
        <div className="panel-card p-6 space-y-4">
          <h3 className="font-display text-lg">Emergency SOS</h3>
          <p className="text-sm text-steel">Use only if you are in immediate danger.</p>
          <button onClick={triggerPanic} className="w-full bg-alert text-white rounded-xl py-3 font-semibold">
            Trigger Panic Alert
          </button>
        </div>
      </div>

      {status && <div className="panel-card p-4 text-sm text-navy">{status}</div>}
    </div>
  );
}
