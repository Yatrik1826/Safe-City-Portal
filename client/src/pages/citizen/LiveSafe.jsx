import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import LocationPicker from '../../components/LocationPicker.jsx';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'police', label: 'Police' },
  { key: 'hospital', label: 'Hospitals' },
  { key: 'firestation', label: 'Fire' },
  { key: 'pharmacy', label: 'Medical Stores' },
];

export default function LiveSafe() {
  const [location, setLocation] = useState({ lat: 28.613, lng: 77.209, label: 'Central Zone' });
  const [type, setType] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'Current Location' });
      },
      () => {}
    );
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        lat: location.lat,
        lng: location.lng,
        km: 5,
      });
      if (type !== 'all') query.set('type', type);
      try {
        const res = await api.get(`/api/livesafe/nearby?${query.toString()}`);
        setResults(res.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [location, type]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl">Explore LiveSafe</h2>
          <p className="text-sm text-steel">Nearby safety services based on your location.</p>
        </div>
        <button
          onClick={useMyLocation}
          className="bg-royal text-white rounded-xl px-4 py-2 text-sm font-semibold"
        >
          Use My Location
        </button>
      </header>

      <LocationPicker value={location} onChange={setLocation} />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setType(f.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              type === f.key ? 'bg-royal text-white' : 'bg-white border border-sky text-navy'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <div className="panel-card p-4 text-sm text-steel">Fetching nearby services...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((r) => (
          <div key={r.id} className="panel-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">{r.name}</h3>
              <span className="text-xs text-steel">{r.distanceKm.toFixed(1)} km</span>
            </div>
            <p className="text-sm text-steel mt-1 capitalize">{r.type.replace('_', ' ')}</p>
            <div className="mt-4 flex gap-2">
              <a
                className="bg-royal text-white rounded-xl px-3 py-2 text-xs"
                href={`https://www.google.com/maps/search/?api=1&query=${r.coords[1]},${r.coords[0]}`}
                target="_blank"
                rel="noreferrer"
              >
                Directions
              </a>
              <button className="bg-white border border-navy text-navy rounded-xl px-3 py-2 text-xs">
                Share
              </button>
            </div>
          </div>
        ))}
        {!loading && results.length === 0 && (
          <div className="panel-card p-6 text-sm text-steel">No nearby services within 5 km.</div>
        )}
      </div>
    </div>
  );
}
