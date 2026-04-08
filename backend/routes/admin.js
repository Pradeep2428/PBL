const express = require('express');
const router = express.Router();
const User = require('../models/User');
const RFQ = require('../models/RFQ');
const Shipment = require('../models/Shipment');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// GET /api/admin/users
router.get('/users', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/users/:id/approve
router.put('/users/:id/approve', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true, kycVerified: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/users/:id/reject
router.put('/users/:id/reject', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/rfqs
router.get('/rfqs', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const rfqs = await RFQ.find({})
      .populate('buyer', 'name companyName email country')
      .populate('product', 'name category price')
      .sort({ createdAt: -1 });
    res.json(rfqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/rfqs/:id/quote
router.put('/rfqs/:id/quote', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const { quotedPrice, adminNotes, status } = req.body;
    const rfq = await RFQ.findByIdAndUpdate(
      req.params.id,
      { quotedPrice, adminNotes, status: status || 'quoted' },
      { new: true }
    )
      .populate('buyer', 'name email')
      .populate('product', 'name');
    if (!rfq) return res.status(404).json({ message: 'RFQ not found' });
    res.json(rfq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/shipments
router.get('/shipments', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const shipments = await Shipment.find({})
      .populate({ path: 'order', populate: [{ path: 'buyer', select: 'name companyName' }, { path: 'product', select: 'name' }] })
      .sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/shipments
router.post('/shipments', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    await Order.findByIdAndUpdate(req.body.order, { status: 'shipped' });
    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/shipments/:id/update
router.put('/shipments/:id/update', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const { status, location, description } = req.body;
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { updates: { status, location, description, timestamp: new Date() } },
      },
      { new: true }
    );
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    if (status === 'delivered') {
      await Order.findByIdAndUpdate(shipment.order, { status: 'delivered' });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
