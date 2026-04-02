const Incident = require('../models/Incident');
const { generateIncident } = require('./dataGenerator');
const { getIO } = require('../sockets/io');

let intervalRef = null;

const startStream = (frequencyPerMinute = 6) => {
  if (intervalRef) return;
  const intervalMs = Math.max(1, Math.floor(60000 / frequencyPerMinute));
  intervalRef = setInterval(async () => {
    try {
      const incident = await Incident.create(generateIncident());
      getIO().emit('incident:new', incident);
    } catch (err) {
      console.error('Stream simulation error', err.message);
    }
  }, intervalMs);
};

const stopStream = () => {
  if (intervalRef) {
    clearInterval(intervalRef);
    intervalRef = null;
  }
};

const isRunning = () => !!intervalRef;

module.exports = { startStream, stopStream, isRunning };
