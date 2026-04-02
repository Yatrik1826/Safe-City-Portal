const mongoose = require('mongoose');

const emergencyAlertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    incident: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident' },
    status: { type: String, enum: ['pending', 'dispatched', 'resolved'], default: 'pending' },
    assignedUnit: {
      unitId: { type: String },
      name: { type: String },
      location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number] },
      },
    },
    responseTimeSec: { type: Number },
    notes: { type: String },
    triggeredAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

emergencyAlertSchema.index({ 'assignedUnit.location': '2dsphere' });

module.exports = mongoose.model('EmergencyAlert', emergencyAlertSchema);
