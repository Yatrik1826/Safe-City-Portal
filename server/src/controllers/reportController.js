const Incident = require('../models/Incident');
const { computeRiskLevel } = require('../utils/risk');

const reportSnapshot = async (req, res, next) => {
  try {
    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;
    const match = {};
    if (from || to) {
      match.reportedAt = {};
      if (from) match.reportedAt.$gte = from;
      if (to) match.reportedAt.$lte = to;
    }

    const countsByCategory = await Incident.aggregate([
      { $match: match },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const hourlyTrend = await Incident.aggregate([
      { $match: match },
      { $project: { hour: { $hour: '$reportedAt' } } },
      { $group: { _id: '$hour', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const grid = await Incident.aggregate([
      { $match: match },
      {
        $project: {
          lng: { $arrayElemAt: ['$location.coordinates', 0] },
          lat: { $arrayElemAt: ['$location.coordinates', 1] },
        },
      },
      { $project: { cellLng: { $round: ['$lng', 2] }, cellLat: { $round: ['$lat', 2] } } },
      { $group: { _id: { cellLng: '$cellLng', cellLat: '$cellLat' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    const areaRisks = grid.map((cell) => {
      const { riskLevel, riskScore } = computeRiskLevel(cell.count, 1);
      return {
        areaName: `Cell ${cell._id.cellLat},${cell._id.cellLng}`,
        centroid: { type: 'Point', coordinates: [cell._id.cellLng, cell._id.cellLat] },
        incidentCount: cell.count,
        riskLevel,
        riskScore,
      };
    });

    res.json({
      generatedAt: new Date(),
      filters: { from, to },
      countsByCategory,
      hourlyTrend,
      topRiskAreas: areaRisks,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { reportSnapshot };
