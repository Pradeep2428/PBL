const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['cumin', 'spices', 'dehydrated', 'grains', 'other'],
    required: true,
  },
  origin: { type: String, default: 'India', trim: true },
  quality: { type: String, trim: true },
  MOQ: { type: Number, required: true },
  moqUnit: { type: String, default: 'MT' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  description: { type: String, trim: true },
  specs: { type: Map, of: String },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);
