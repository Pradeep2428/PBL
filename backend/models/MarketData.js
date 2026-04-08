const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema({
  commodity: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  unit: { type: String, default: 'per MT' },
  country: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  source: { type: String, trim: true },
  trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  changePercent: { type: Number, default: 0 },
  volume: { type: Number },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

marketDataSchema.index({ commodity: 1, date: -1 });
marketDataSchema.index({ country: 1, commodity: 1 });

module.exports = mongoose.model('MarketData', marketDataSchema);
