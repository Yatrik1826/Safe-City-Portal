import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import api from '../services/api.js';

const riskColors = {
  low: '#38A169',
  medium: '#F6AD55',
  high: '#E53E3E',
};

export default function MapPanel({ points = [] }) {
  const [riskAreas, setRiskAreas] = useState([]);
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/analytics/area-risk');
        setRiskAreas(res.data.areas || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!mapRef) return;
    const heat = L.heatLayer(
      points.map((p) => [p.lat, p.lng, p.weight || 0.5]),
      { radius: 28, blur: 20, maxZoom: 13 }
    ).addTo(mapRef);
    return () => {
      mapRef.removeLayer(heat);
    };
  }, [mapRef, points]);

  return (
    <div className="panel-card p-4 h-[360px] relative">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">Citywide Heatmap</h3>
        <span className="text-xs text-steel">Leaflet + OpenStreetMap</span>
      </div>
      <div className="mt-4 h-72 rounded-xl overflow-hidden">
        <MapContainer
          center={[28.613, 77.209]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMapRef}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {riskAreas.map((area) => (
            <CircleMarker
              key={area._id || area.areaName}
              center={[area.centroid.coordinates[1], area.centroid.coordinates[0]]}
              radius={10}
              pathOptions={{ color: riskColors[area.riskLevel], fillColor: riskColors[area.riskLevel], fillOpacity: 0.55 }}
            />
          ))}
        </MapContainer>
      </div>
      <div className="absolute bottom-4 left-6 bg-white/80 backdrop-blur rounded-xl border border-sky px-3 py-2 text-xs text-navy">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#38A169]"></span> Low
          <span className="h-2 w-2 rounded-full bg-[#F6AD55] ml-3"></span> Medium
          <span className="h-2 w-2 rounded-full bg-[#E53E3E] ml-3"></span> High
        </div>
      </div>
    </div>
  );
}
