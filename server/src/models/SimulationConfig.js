const mongoose = require('mongoose');

const simulationConfigSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: false },
    frequencyPerMinute: { type: Number, default: 6 },
    areaSelection: { type: String, default: 'citywide' },
    lastRunAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SimulationConfig', simulationConfigSchema);
