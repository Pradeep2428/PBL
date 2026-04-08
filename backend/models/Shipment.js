const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  containerNo: { type: String, trim: true },
  blNumber: { type: String, trim: true },
  vessel: { type: String, trim: true },
  origin: { type: String, default: 'Mundra Port, India' },
  destination: { type: String, required: true },
  status: {
    type: String,
    enum: ['loading', 'in-transit', 'customs', 'delivered'],
    default: 'loading',
  },
  estimatedArrival: { type: Date },
  actualArrival: { type: Date },
  updates: [
    {
      status: { type: String },
      location: { type: String },
      description: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shipment', shipmentSchema);
