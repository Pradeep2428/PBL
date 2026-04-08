const mongoose = require('mongoose');

const cropListingSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropType: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'quintal' },
  harvestDate: { type: Date },
  askingPrice: { type: Number },
  priceCurrency: { type: String, default: 'INR' },
  location: { type: String, trim: true },
  district: { type: String, trim: true },
  state: { type: String, default: 'Gujarat' },
  quality: { type: String, enum: ['A', 'B', 'C'], default: 'A' },
  status: { type: String, enum: ['available', 'sold', 'expired'], default: 'available' },
  sellIntent: { type: Boolean, default: true },
  notes: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cropListingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CropListing', cropListingSchema);
