const Incident = require('../models/Incident');
const { computeRiskLevel } = require('../utils/risk');

const buildGeoWithin = (center, km) => ({
  $geoWithin: {
    $centerSphere: [center, km / 6378.1],
  },
});

const getTimeBuckets = async (match) => {
  const hourly = await Incident.aggregate([
    { $match: match },
    { $project: { hour: { $hour: '$reportedAt' } } },
    { $group: { _id: '$hour', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  return hourly;
};

const areaPrediction = async (req, res, next) => {
  try {
    const { lng, lat, km = 2 } = req.query;
    if (!lng || !lat) return res.status(400).json({ message: 'lng and lat required' });
    const center = [Number(lng), Number(lat)];
    const radiusKm = Number(km);

    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const match = {
      reportedAt: { $gte: since30 },
      location: buildGeoWithin(center, radiusKm),
    };

    const incidents = await Incident.find(match).select('reportedAt');
    const recentCount = incidents.filter((i) => i.reportedAt >= since7).length;
    const { riskLevel, riskScore } = computeRiskLevel(incidents.length, Math.max(1, recentCount / 5));

    const hourly = await getTimeBuckets(match);
    const avg = hourly.reduce((acc, h) => acc + h.count, 0) / (hourly.length || 1);
    const unsafeHours = hourly
      .filter((h) => h.count >= avg * 1.2)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((h) => h._id);

    const explanation = `Based on ${incidents.length} incidents in the last 30 days (${recentCount} in the last 7 days), this area is classified as ${riskLevel}.`;

    res.json({
      center,
      radiusKm,
      riskLevel,
      riskScore,
      incidentCount30d: incidents.length,
      incidentCount7d: recentCount,
      unsafeHours,
      explanation,
    });
  } catch (err) {
    return next(err);
  }
};

const unsafeTimeWindows = async (req, res, next) => {
  try {
    const { lng, lat, km = 2 } = req.query;
    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const match = { reportedAt: { $gte: since30 } };

    if (lng && lat) {
      match.location = buildGeoWithin([Number(lng), Number(lat)], Number(km));
    }

    const hourly = await getTimeBuckets(match);
    const avg = hourly.reduce((acc, h) => acc + h.count, 0) / (hourly.length || 1);
    const risky = hourly
      .filter((h) => h.count >= avg * 1.1)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      windowType: lng && lat ? 'area' : 'citywide',
      avgHourly: avg,
      riskyHours: risky.map((h) => ({ hour: h._id, count: h.count })),
      message: 'Hours with incident rates above baseline should be monitored closely.',
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { areaPrediction, unsafeTimeWindows };
