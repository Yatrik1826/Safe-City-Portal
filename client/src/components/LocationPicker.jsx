import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const zones = [
  { name: 'Connaught Place', coords: [77.2167, 28.6315] },
  { name: 'South Delhi', coords: [77.2205, 28.545] },
  { name: 'Old Delhi', coords: [77.233, 28.656] },
  { name: 'Airport Corridor', coords: [77.12, 28.556] },
];

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationClick({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng, 'Pinned Location');
    },
  });
  return null;
}

export default function LocationPicker({ value, onChange }) {
  const updateLocation = (lat, lng, labelText) => {
    onChange({ lng, lat, label: labelText });
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateLocation(pos.coords.latitude, pos.coords.longitude, 'Current Location');
      },
      () => {}
    );
  };

  return (
    <div className="panel-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">Location</h3>
        <button
          onClick={useMyLocation}
          className="rounded-xl border border-navy px-3 py-1 text-xs font-semibold"
        >
          Use My Location
        </button>
      </div>

      <div className="h-64 rounded-xl overflow-hidden border border-sky">
        <MapContainer center={[value.lat, value.lng]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[value.lat, value.lng]} />
          <LocationClick onPick={updateLocation} />
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-2">
        {zones.map((z) => (
          <button
            key={z.name}
            onClick={() => updateLocation(z.coords[1], z.coords[0], z.name)}
            className="rounded-full bg-white/70 border border-sky px-3 py-1 text-xs"
          >
            {z.name}
          </button>
        ))}
      </div>

      <div className="text-xs text-steel">
        Selected: {value.label || `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`}
      </div>
    </div>
  );
}
