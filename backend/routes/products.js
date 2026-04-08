const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, origin, search } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (origin) filter.origin = new RegExp(origin, 'i');
    if (search) filter.name = new RegExp(search, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(filter).populate('createdBy', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products (admin only)
router.post('/', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id (admin only)
router.put('/:id', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id (admin only)
router.delete('/:id', auth, roleCheck('admin', 'superadmin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deactivated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
