const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const categories = ['harassment', 'theft', 'assault', 'stalking'];
const hotspots = [
  { name: 'Connaught Place', center: [77.2167, 28.6315], spread: 0.01 },
  { name: 'South Delhi', center: [77.2205, 28.545], spread: 0.015 },
  { name: 'Old Delhi', center: [77.233, 28.656], spread: 0.012 },
  { name: 'Airport Corridor', center: [77.12, 28.556], spread: 0.02 },
];

const rand = (min, max) => min + Math.random() * (max - min);

const pickCategory = () => {
  const r = Math.random();
  if (r < 0.45) return 'harassment';
  if (r < 0.7) return 'theft';
  if (r < 0.88) return 'assault';
  return 'stalking';
};

const pickTime = () => {
  const now = dayjs();
  const nightBias = Math.random() < 0.65;
  const hour = nightBias ? Math.floor(rand(19, 24)) : Math.floor(rand(6, 19));
  return now.hour(hour).minute(Math.floor(rand(0, 59))).second(Math.floor(rand(0, 59))).toDate();
};

const pickHotspot = () => hotspots[Math.floor(Math.random() * hotspots.length)];

const generateIncident = (overrides = {}) => {
  const hotspot = pickHotspot();
  const lng = hotspot.center[0] + rand(-hotspot.spread, hotspot.spread);
  const lat = hotspot.center[1] + rand(-hotspot.spread, hotspot.spread);
  const category = pickCategory();
  const severity = category === 'assault' ? 4 : category === 'harassment' ? 3 : 2;
  const reportedAt = pickTime();
  return {
    category,
    description: `Synthetic incident ${uuidv4().slice(0, 8)} near ${hotspot.name}`,
    severity,
    location: { type: 'Point', coordinates: [lng, lat] },
    addressLabel: hotspot.name,
    reportedAt,
    isSimulated: true,
    tags: ['synthetic', hotspot.name],
    ...overrides,
  };
};

module.exports = { generateIncident };
