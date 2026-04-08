const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const auth = require('../middleware/auth');

const ALLOWED_ROLES = ['buyer', 'farmer', 'admin', 'superadmin'];

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, role, companyName, phone, country } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const safeEmail = String(email).toLowerCase().trim();
    const safeRole = ALLOWED_ROLES.includes(role) ? role : 'buyer';
    const existing = await User.findOne({ email: safeEmail });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({
      name: String(name).trim(),
      email: safeEmail,
      password,
      role: safeRole,
      companyName: companyName ? String(companyName).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
      country: country ? String(country).trim() : undefined,
      isApproved: ['admin', 'superadmin'].includes(safeRole),
    });

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const safeEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: safeEmail });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(String(password));
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
