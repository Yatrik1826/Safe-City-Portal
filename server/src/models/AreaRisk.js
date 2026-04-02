const mongoose = require('mongoose');

const areaRiskSchema = new mongoose.Schema(
  {
    areaName: { type: String, required: true },
    centroid: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    riskScore: { type: Number, required: true },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
    incidentCount: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

areaRiskSchema.index({ centroid: '2dsphere' });
areaRiskSchema.index({ riskLevel: 1 });

module.exports = mongoose.model('AreaRisk', areaRiskSchema);
