const express = require('express');
const router = express.Router();
const RFQ = require('../models/RFQ');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// GET /api/buyers/rfqs
router.get('/rfqs', auth, roleCheck('buyer'), async (req, res) => {
  try {
    const rfqs = await RFQ.find({ buyer: req.user._id })
      .populate('product', 'name category price')
      .sort({ createdAt: -1 });
    res.json(rfqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/buyers/rfqs
router.post('/rfqs', auth, roleCheck('buyer'), async (req, res) => {
  try {
    const rfq = await RFQ.create({ ...req.body, buyer: req.user._id });
    await rfq.populate('product', 'name category price');
    res.status(201).json(rfq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/buyers/orders
router.get('/orders', auth, roleCheck('buyer'), async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('product', 'name category')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/buyers/orders/:id/documents
router.get('/orders/:id/documents', auth, roleCheck('buyer'), async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, buyer: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order.documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
