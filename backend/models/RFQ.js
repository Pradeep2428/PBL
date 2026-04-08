const mongoose = require('mongoose');

const rfqSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'MT' },
  targetPrice: { type: Number },
  currency: { type: String, default: 'USD' },
  deliveryDate: { type: Date },
  deliveryPort: { type: String, trim: true },
  message: { type: String, trim: true },
  status: {
    type: String,
    enum: ['pending', 'quoted', 'accepted', 'rejected'],
    default: 'pending',
  },
  adminNotes: { type: String, trim: true },
  quotedPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

rfqSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('RFQ', rfqSchema);
