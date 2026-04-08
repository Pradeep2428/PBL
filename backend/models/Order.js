const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  rfq: { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ' },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'MT' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  totalValue: { type: Number },
  status: {
    type: String,
    enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'placed',
  },
  documents: [
    {
      type: { type: String },
      name: { type: String },
      url: { type: String },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
  this.totalValue = this.quantity * this.price;
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
