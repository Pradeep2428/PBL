const express = require('express');
const router = express.Router();
const CropListing = require('../models/CropListing');
const MarketData = require('../models/MarketData');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// GET /api/farmers/crops
router.get('/crops', auth, roleCheck('farmer'), async (req, res) => {
  try {
    const crops = await CropListing.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/farmers/crops
router.post('/crops', auth, roleCheck('farmer'), async (req, res) => {
  try {
    const { cropType, quantity, unit, harvestDate, askingPrice, location, sellIntent } = req.body;
    const crop = await CropListing.create({
      cropType: String(cropType || '').trim(),
      quantity: Number(quantity),
      unit: String(unit || '').trim(),
      harvestDate,
      askingPrice: Number(askingPrice),
      location: location ? String(location).trim() : undefined,
      sellIntent: Boolean(sellIntent),
      farmer: req.user._id,
    });
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/farmers/crops/:id
router.put('/crops/:id', auth, roleCheck('farmer'), async (req, res) => {
  try {
    const { quantity, askingPrice, status, sellIntent } = req.body;
    const updateFields = {};
    if (quantity !== undefined) updateFields.quantity = Number(quantity);
    if (askingPrice !== undefined) updateFields.askingPrice = Number(askingPrice);
    if (status !== undefined) updateFields.status = String(status);
    if (sellIntent !== undefined) updateFields.sellIntent = Boolean(sellIntent);
    const crop = await CropListing.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      updateFields,
      { new: true }
    );
    if (!crop) return res.status(404).json({ message: 'Crop listing not found' });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/farmers/advisory
router.get('/advisory', auth, roleCheck('farmer'), async (req, res) => {
  try {
    const marketData = await MarketData.find({}).sort({ date: -1 }).limit(20);
    const advisory = [
      {
        commodity: 'Cumin',
        action: 'SELL',
        confidence: 87,
        reason: 'Global cumin prices up 12% due to reduced Turkey crop. UAE demand surging.',
        targetPrice: 3200,
        currency: 'USD/MT',
        validTill: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
      {
        commodity: 'Coriander',
        action: 'HOLD',
        confidence: 72,
        reason: 'EU harvest season ending. Prices expected to rise by 8% in 3 weeks.',
        targetPrice: 1450,
        currency: 'USD/MT',
        validTill: new Date(Date.now() + 21 * 24 * 3600 * 1000),
      },
      {
        commodity: 'Dehydrated Onion',
        action: 'STORE',
        confidence: 65,
        reason: 'Current prices below fair value. Storage advisable for 4-6 weeks.',
        targetPrice: 1100,
        currency: 'USD/MT',
        validTill: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      },
    ];
    res.json({ advisory, marketData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/farmers/market-demand
router.get('/market-demand', auth, roleCheck('farmer'), async (req, res) => {
  try {
    const data = await MarketData.find({}).sort({ date: -1 }).limit(50);
    const demandAlerts = [
      { country: 'UAE', commodity: 'Cumin', demand: 'HIGH', quantity: '500 MT', urgency: 'urgent' },
      { country: 'Germany', commodity: 'Turmeric', demand: 'MEDIUM', quantity: '200 MT', urgency: 'normal' },
      { country: 'USA', commodity: 'Dehydrated Onion', demand: 'HIGH', quantity: '1000 MT', urgency: 'urgent' },
      { country: 'UK', commodity: 'Black Pepper', demand: 'LOW', quantity: '50 MT', urgency: 'low' },
    ];
    res.json({ marketData: data, demandAlerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
