const { z } = require('zod');
const Incident = require('../models/Incident');
const SimulationConfig = require('../models/SimulationConfig');
const { generateIncident } = require('../simulators/dataGenerator');
const { startStream, stopStream, isRunning } = require('../simulators/streamService');
const { getIO } = require('../sockets/io');

const generateSchema = z.object({ count: z.number().min(1).max(200).optional() });
const streamSchema = z.object({ frequencyPerMinute: z.number().min(1).max(120).optional() });

const generateIncidents = async (req, res, next) => {
  try {
    const { count = 30 } = generateSchema.parse(req.body || {});
    const docs = Array.from({ length: count }, () => generateIncident());
    const created = await Incident.insertMany(docs);
    created.forEach((i) => getIO().emit('incident:new', i));
    res.status(201).json({ created: created.length });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    return next(err);
  }
};

const startSimulation = async (req, res, next) => {
  try {
    const { frequencyPerMinute = 6 } = streamSchema.parse(req.body || {});
    startStream(frequencyPerMinute);
    await SimulationConfig.findOneAndUpdate(
      {},
      { enabled: true, frequencyPerMinute, lastRunAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ running: true, frequencyPerMinute });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    return next(err);
  }
};

const stopSimulation = async (req, res, next) => {
  try {
    stopStream();
    await SimulationConfig.findOneAndUpdate({}, { enabled: false }, { upsert: true, new: true });
    res.json({ running: false });
  } catch (err) {
    return next(err);
  }
};

const simulationStatus = async (req, res, next) => {
  try {
    const config = await SimulationConfig.findOne({});
    res.json({
      running: isRunning(),
      config: config || { enabled: false, frequencyPerMinute: 6 },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { generateIncidents, startSimulation, stopSimulation, simulationStatus };
