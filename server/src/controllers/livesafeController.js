const { haversineDistanceKm } = require('../utils/geo');

const FALLBACK = [
  { id: 'police-01', name: 'Central Police Station', type: 'police', coords: [77.2167, 28.6315] },
  { id: 'hospital-01', name: 'City General Hospital', type: 'hospital', coords: [77.2332, 28.6396] },
  { id: 'fire-01', name: 'Central Fire Station', type: 'firestation', coords: [77.2195, 28.6322] },
  { id: 'pharmacy-01', name: '24x7 Medical Store', type: 'pharmacy', coords: [77.2088, 28.6291] },
];

const typeToAmenity = {
  police: 'police',
  hospital: 'hospital',
  firestation: 'fire_station',
  pharmacy: 'pharmacy',
};

const buildOverpassQuery = (lat, lng, radius, types) => {
  const clauses = types
    .map((t) => `node[amenity=${t}](around:${radius},${lat},${lng});`)
    .join('');
  return `[out:json][timeout:20];(${clauses});out;`;
};

const fetchOverpass = async (query) => {
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  });
  if (!res.ok) throw new Error('Overpass request failed');
  return res.json();
};

const nearbyServices = async (req, res, next) => {
  try {
    const { lng, lat, km = 5, type } = req.query;
    if (!lng || !lat) return res.status(400).json({ message: 'lng and lat required' });
    const center = [Number(lng), Number(lat)];
    const radiusKm = Number(km);
    const radiusMeters = Math.min(10000, Math.max(1000, radiusKm * 1000));

    const types = type && type !== 'all'
      ? [typeToAmenity[type]].filter(Boolean)
      : Object.values(typeToAmenity);

    let results = [];
    try {
      const query = buildOverpassQuery(Number(lat), Number(lng), radiusMeters, types);
      const data = await fetchOverpass(query);
      results = (data.elements || [])
        .filter((e) => e.type === 'node' && e.lat && e.lon)
        .map((e) => ({
          id: `${e.id}`,
          name: e.tags?.name || `${e.tags?.amenity || 'service'}`,
          type: e.tags?.amenity || 'service',
          coords: [e.lon, e.lat],
          distanceKm: haversineDistanceKm(center, [e.lon, e.lat]),
        }))
        .filter((s) => s.distanceKm <= radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 20);
    } catch (err) {
      results = FALLBACK
        .map((s) => ({
          ...s,
          distanceKm: haversineDistanceKm(center, s.coords),
        }))
        .filter((s) => s.distanceKm <= radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm);
    }

    res.json({ center, radiusKm, results });
  } catch (err) {
    return next(err);
  }
};

module.exports = { nearbyServices };
