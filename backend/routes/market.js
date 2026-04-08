const express = require('express');
const router = express.Router();
const MarketData = require('../models/MarketData');

const COMMODITIES = ['Cumin', 'Turmeric', 'Coriander', 'Dehydrated Onion', 'Black Pepper', 'Fenugreek'];

// GET /api/market/commodity-trends
router.get('/commodity-trends', async (req, res) => {
  try {
    const { commodity } = req.query;
    const filter = commodity ? { commodity: new RegExp(commodity, 'i') } : {};
    const data = await MarketData.find(filter).sort({ date: -1 }).limit(200);

    if (data.length === 0) {
      const mockTrends = {};
      COMMODITIES.forEach((c) => {
        mockTrends[c] = generateMockPriceTrend(c);
      });
      return res.json(mockTrends);
    }

    const grouped = {};
    data.forEach((d) => {
      if (!grouped[d.commodity]) grouped[d.commodity] = [];
      grouped[d.commodity].push({ date: d.date, price: d.price, trend: d.trend });
    });
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateMockPriceTrend(commodity) {
  const basePrice = { Cumin: 2800, Turmeric: 1800, Coriander: 1200, 'Dehydrated Onion': 900, 'Black Pepper': 6000, Fenugreek: 1100 };
  const base = basePrice[commodity] || 1500;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    price: Math.round(base + base * 0.1 * Math.sin(i / 2) + (Math.random() - 0.5) * base * 0.08),
    uae: Math.round(base * 1.12 + (Math.random() - 0.5) * base * 0.06),
    eu: Math.round(base * 1.18 + (Math.random() - 0.5) * base * 0.07),
    usa: Math.round(base * 1.25 + (Math.random() - 0.5) * base * 0.08),
  }));
}

// GET /api/market/impact-analysis
router.get('/impact-analysis', async (req, res) => {
  try {
    const events = [
      {
        id: 1,
        event: 'Turkey Drought 2024',
        region: 'Turkey',
        severity: 'HIGH',
        affectedCommodities: ['Cumin', 'Coriander'],
        impact: '+18% price increase',
        indianMarketEffect: 'Strong export opportunity',
        farmerAction: 'SELL NOW',
        confidence: 91,
        date: new Date('2024-06-15'),
      },
      {
        id: 2,
        event: 'EU Organic Import Surge',
        region: 'European Union',
        severity: 'MEDIUM',
        affectedCommodities: ['Turmeric', 'Black Pepper'],
        impact: '+12% demand increase',
        indianMarketEffect: 'Organic certified products premium',
        farmerAction: 'GET CERTIFIED',
        confidence: 78,
        date: new Date('2024-07-01'),
      },
      {
        id: 3,
        event: 'UAE Ramadan Stocking',
        region: 'UAE & GCC',
        severity: 'MEDIUM',
        affectedCommodities: ['Dehydrated Onion', 'Cumin', 'Coriander'],
        impact: '+25% volume demand',
        indianMarketEffect: 'Q1 2025 export window opening',
        farmerAction: 'PREPARE INVENTORY',
        confidence: 85,
        date: new Date('2024-08-10'),
      },
      {
        id: 4,
        event: 'INR Depreciation',
        region: 'India',
        severity: 'LOW',
        affectedCommodities: ['All Commodities'],
        impact: 'Export price competitiveness +5%',
        indianMarketEffect: 'Indian exporters gain price edge',
        farmerAction: 'HOLD FOR BETTER RATES',
        confidence: 70,
        date: new Date('2024-08-20'),
      },
    ];
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/market/news
router.get('/news', async (req, res) => {
  try {
    const news = [
      {
        id: 1,
        headline: 'India Spice Exports Hit Record $4.1B in FY2024',
        source: 'Spices Board India',
        category: 'exports',
        date: new Date('2024-08-18'),
        summary: 'Indian spice exports reached an all-time high driven by cumin, pepper and turmeric demand.',
        impact: 'positive',
      },
      {
        id: 2,
        headline: 'Turkey Cumin Crop Down 30% Due to Drought',
        source: 'Reuters Agri',
        category: 'supply',
        date: new Date('2024-08-15'),
        summary: 'Severe drought in Anatolia region significantly reduced Turkey cumin production for 2024.',
        impact: 'positive',
      },
      {
        id: 3,
        headline: 'EU New Pesticide Regulations Affect Imports',
        source: 'European Food Authority',
        category: 'regulation',
        date: new Date('2024-08-12'),
        summary: 'New EU MRL regulations taking effect Oct 2024 require stricter certification for spice imports.',
        impact: 'neutral',
      },
      {
        id: 4,
        headline: 'UAE Food Import Demand Up 20% for Q4 2024',
        source: 'Dubai Chamber of Commerce',
        category: 'demand',
        date: new Date('2024-08-10'),
        summary: 'UAE and GCC markets showing strong demand ahead of Ramadan season stocking.',
        impact: 'positive',
      },
      {
        id: 5,
        headline: 'India-UK FTA Negotiations: Agri Exports in Focus',
        source: 'Economic Times',
        category: 'policy',
        date: new Date('2024-08-08'),
        summary: 'FTA negotiations include zero-duty access for Indian spices and dehydrated products.',
        impact: 'positive',
      },
    ];
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/market/country-demand
router.get('/country-demand', async (req, res) => {
  try {
    const demandData = [
      { country: 'UAE', flag: '🇦🇪', cumin: 'HIGH', turmeric: 'MEDIUM', dehydrated: 'HIGH', pepper: 'LOW', totalDemand: 94 },
      { country: 'USA', flag: '🇺🇸', cumin: 'MEDIUM', turmeric: 'HIGH', dehydrated: 'HIGH', pepper: 'HIGH', totalDemand: 88 },
      { country: 'Germany', flag: '🇩🇪', cumin: 'HIGH', turmeric: 'MEDIUM', dehydrated: 'MEDIUM', pepper: 'MEDIUM', totalDemand: 76 },
      { country: 'UK', flag: '🇬🇧', cumin: 'MEDIUM', turmeric: 'HIGH', dehydrated: 'LOW', pepper: 'MEDIUM', totalDemand: 72 },
      { country: 'Japan', flag: '🇯🇵', cumin: 'LOW', turmeric: 'HIGH', dehydrated: 'MEDIUM', pepper: 'HIGH', totalDemand: 68 },
      { country: 'Singapore', flag: '🇸🇬', cumin: 'MEDIUM', turmeric: 'MEDIUM', dehydrated: 'HIGH', pepper: 'MEDIUM', totalDemand: 65 },
      { country: 'Bangladesh', flag: '🇧🇩', cumin: 'HIGH', turmeric: 'HIGH', dehydrated: 'LOW', pepper: 'LOW', totalDemand: 82 },
      { country: 'Saudi Arabia', flag: '🇸🇦', cumin: 'HIGH', turmeric: 'LOW', dehydrated: 'HIGH', pepper: 'MEDIUM', totalDemand: 78 },
    ];
    res.json(demandData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
