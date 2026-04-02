const units = [
  { unitId: 'U-101', name: 'Patrol Alpha', coordinates: [77.209, 28.613] },
  { unitId: 'U-203', name: 'Patrol Bravo', coordinates: [77.182, 28.628] },
  { unitId: 'U-312', name: 'Rapid Response', coordinates: [77.239, 28.612] },
  { unitId: 'U-414', name: 'Women Safety Cell', coordinates: [77.215, 28.599] },
];

const pickNearestUnit = (lng, lat) => {
  const dist = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  let best = units[0];
  let bestDist = dist(units[0].coordinates, [lng, lat]);
  for (const u of units) {
    const d = dist(u.coordinates, [lng, lat]);
    if (d < bestDist) {
      best = u;
      bestDist = d;
    }
  }
  return best;
};

const getUnitById = (id) => units.find((u) => u.unitId === id) || null;

module.exports = { pickNearestUnit, getUnitById };
