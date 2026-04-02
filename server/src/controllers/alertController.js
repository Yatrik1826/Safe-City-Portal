const { z } = require('zod');
const EmergencyAlert = require('../models/EmergencyAlert');
const Incident = require('../models/Incident');
const { pickNearestUnit } = require('../services/units');
const { getIO } = require('../sockets/io');

const panicSchema = z.object({
  lng: z.number(),
  lat: z.number(),
  category: z.enum(['harassment', 'theft', 'assault', 'stalking']).optional(),
  description: z.string().max(500).optional(),
});

const triggerPanic = async (req, res, next) => {
  try {
    const payload = panicSchema.parse(req.body);
    let incident = null;
    if (payload.category) {
      incident = await Incident.create({
        category: payload.category,
        description: payload.description,
        severity: 4,
        location: { type: 'Point', coordinates: [payload.lng, payload.lat] },
        reportedBy: req.user.id,
        reportedAt: new Date(),
        isSimulated: false,
      });
      getIO().emit('incident:new', incident);
    }

    const unit = pickNearestUnit(payload.lng, payload.lat);
    const responseTimeSec = 180 + Math.floor(Math.random() * 240);

    const alert = await EmergencyAlert.create({
      user: req.user.id,
      incident: incident?._id,
      status: 'pending',
      assignedUnit: {
        unitId: unit.unitId,
        name: unit.name,
        location: { type: 'Point', coordinates: unit.coordinates },
      },
      responseTimeSec,
      triggeredAt: new Date(),
    });

    getIO().emit('alert:new', alert);

    res.status(201).json(alert);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    return next(err);
  }
};

const listAlerts = async (req, res, next) => {
  try {
    const { status, limit = 100 } = req.query;
    const query = {};
    if (status) query.status = status;
    const alerts = await EmergencyAlert.find(query)
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit), 200));
    res.json(alerts);
  } catch (err) {
    return next(err);
  }
};

const updateAlertStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'dispatched', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const update = { status };
    if (status === 'resolved') update.resolvedAt = new Date();
    const alert = await EmergencyAlert.findByIdAndUpdate(id, update, { new: true });
    if (!alert) return res.status(404).json({ message: 'Not found' });
    getIO().emit('alert:update', alert);
    res.json(alert);
  } catch (err) {
    return next(err);
  }
};

module.exports = { triggerPanic, listAlerts, updateAlertStatus };
