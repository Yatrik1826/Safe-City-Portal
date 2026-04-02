const { z } = require('zod');
const Incident = require('../models/Incident');
const { getIO } = require('../sockets/io');
const { pickNearestUnit, getUnitById } = require('../services/units');

const createSchema = z.object({
  category: z.enum(['harassment', 'theft', 'assault', 'stalking']),
  description: z.string().max(1000).optional(),
  severity: z.number().min(1).max(5).optional(),
  lng: z.number(),
  lat: z.number(),
  addressLabel: z.string().optional(),
  reportedAt: z.string().datetime().optional(),
  isSimulated: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const assignSchema = z.object({
  unitId: z.string().optional(),
});

const statusSchema = z.object({
  status: z.enum(['open', 'investigating', 'resolved']),
});

const createIncident = async (req, res, next) => {
  try {
    const payload = createSchema.parse(req.body);
    const incident = await Incident.create({
      category: payload.category,
      description: payload.description,
      severity: payload.severity || 3,
      location: { type: 'Point', coordinates: [payload.lng, payload.lat] },
      addressLabel: payload.addressLabel,
      reportedBy: req.user?.id,
      reportedAt: payload.reportedAt ? new Date(payload.reportedAt) : new Date(),
      isSimulated: payload.isSimulated || false,
      tags: payload.tags || [],
    });
    getIO().emit('incident:new', incident);
    res.status(201).json(incident);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    return next(err);
  }
};

const listIncidents = async (req, res, next) => {
  try {
    const {
      category,
      status,
      from,
      to,
      isSimulated,
      limit = 50,
      skip = 0,
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (isSimulated !== undefined) query.isSimulated = isSimulated === 'true';
    if (from || to) {
      query.reportedAt = {};
      if (from) query.reportedAt.$gte = new Date(from);
      if (to) query.reportedAt.$lte = new Date(to);
    }

    const incidents = await Incident.find(query)
      .sort({ reportedAt: -1 })
      .skip(Number(skip))
      .limit(Math.min(Number(limit), 200));

    res.json(incidents);
  } catch (err) {
    return next(err);
  }
};

const nearbyIncidents = async (req, res, next) => {
  try {
    const { lng, lat, km = 2 } = req.query;
    if (!lng || !lat) return res.status(400).json({ message: 'lng and lat required' });
    const incidents = await Incident.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
          $maxDistance: Number(km) * 1000,
        },
      },
    }).limit(200);
    res.json(incidents);
  } catch (err) {
    return next(err);
  }
};

const heatmapPoints = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const query = {};
    if (from || to) {
      query.reportedAt = {};
      if (from) query.reportedAt.$gte = new Date(from);
      if (to) query.reportedAt.$lte = new Date(to);
    }
    const incidents = await Incident.find(query, { location: 1, severity: 1, category: 1, reportedAt: 1 })
      .sort({ reportedAt: -1 })
      .limit(5000);
    const points = incidents.map((i) => ({
      lng: i.location.coordinates[0],
      lat: i.location.coordinates[1],
      weight: i.severity,
      category: i.category,
      reportedAt: i.reportedAt,
    }));
    res.json(points);
  } catch (err) {
    return next(err);
  }
};

const assignIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = assignSchema.parse(req.body || {});
    const incident = await Incident.findById(id);
    if (!incident) return res.status(404).json({ message: 'Not found' });

    let unit = null;
    if (payload.unitId) {
      unit = getUnitById(payload.unitId);
    }
    if (!unit) {
      unit = pickNearestUnit(incident.location.coordinates[0], incident.location.coordinates[1]);
    }

    incident.assignedUnit = { unitId: unit.unitId, name: unit.name };
    incident.assignedAt = new Date();
    incident.status = 'investigating';
    await incident.save();

    getIO().emit('incident:update', incident);
    res.json(incident);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    return next(err);
  }
};

const updateIncidentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = statusSchema.parse(req.body || {});
    const incident = await Incident.findByIdAndUpdate(id, { status: payload.status }, { new: true });
    if (!incident) return res.status(404).json({ message: 'Not found' });
    getIO().emit('incident:update', incident);
    res.json(incident);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    return next(err);
  }
};

module.exports = { createIncident, listIncidents, nearbyIncidents, heatmapPoints, assignIncident, updateIncidentStatus };
