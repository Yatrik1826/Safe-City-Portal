const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    category: { type: String, enum: ['harassment', 'theft', 'assault', 'stalking'], required: true },
    description: { type: String, maxlength: 1000 },
    severity: { type: Number, min: 1, max: 5, default: 3 },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    addressLabel: { type: String },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['open', 'investigating', 'resolved'], default: 'open' },
    assignedUnit: {
      unitId: { type: String },
      name: { type: String },
    },
    assignedAt: { type: Date },
    reportedAt: { type: Date, required: true },
    isSimulated: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

incidentSchema.index({ location: '2dsphere' });
incidentSchema.index({ reportedAt: -1 });
incidentSchema.index({ category: 1 });

module.exports = mongoose.model('Incident', incidentSchema);
