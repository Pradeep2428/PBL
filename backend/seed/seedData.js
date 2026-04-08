require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const RFQ = require('../models/RFQ');
const Order = require('../models/Order');
const Shipment = require('../models/Shipment');
const CropListing = require('../models/CropListing');
const MarketData = require('../models/MarketData');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agri-export';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    User.deleteMany({}), Product.deleteMany({}), RFQ.deleteMany({}),
    Order.deleteMany({}), Shipment.deleteMany({}), CropListing.deleteMany({}), MarketData.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  const hashedPw = await bcrypt.hash('password123', 10);
  const [buyer, farmer, admin, superadmin] = await User.insertMany([
    { name: 'Ahmed Al Rashid', email: 'buyer@demo.com', password: hashedPw, role: 'buyer', companyName: 'Al Rashid Trading LLC', country: 'UAE', phone: '+971-50-1234567', kycVerified: true, trustScore: 88, isApproved: true },
    { name: 'Ramesh Patel', email: 'farmer@demo.com', password: hashedPw, role: 'farmer', companyName: 'Patel Agro Farms', country: 'India', phone: '+91-9876543210', kycVerified: true, trustScore: 92, isApproved: true },
    { name: 'Priya Sharma', email: 'admin@demo.com', password: hashedPw, role: 'admin', companyName: 'AgriExport India Pvt Ltd', country: 'India', phone: '+91-9988776655', kycVerified: true, trustScore: 95, isApproved: true },
    { name: 'Vikram Singh', email: 'superadmin@demo.com', password: hashedPw, role: 'superadmin', companyName: 'AgriExport India Pvt Ltd', country: 'India', phone: '+91-9900112233', kycVerified: true, trustScore: 99, isApproved: true },
  ]);
  console.log('Users created');

  const products = await Product.insertMany([
    { name: 'Cumin Whole (Jeera)', category: 'cumin', origin: 'Unjha, Gujarat, India', quality: 'FAQ Grade', MOQ: 10, moqUnit: 'MT', price: 2850, currency: 'USD', description: 'Premium quality whole cumin seeds from Unjha.', specs: { moisture: '< 8%', purity: '99.5%' }, isActive: true, createdBy: admin._id },
    { name: 'Cumin Powder', category: 'cumin', origin: 'Gujarat, India', quality: 'Premium Ground', MOQ: 5, moqUnit: 'MT', price: 3200, currency: 'USD', description: 'Finely ground cumin powder with high volatile oil content.', specs: { moisture: '< 7%', granularity: '60 mesh' }, isActive: true, createdBy: admin._id },
    { name: 'Dehydrated Onion Flakes', category: 'dehydrated', origin: 'Mahuva, Gujarat, India', quality: 'Export Grade A', MOQ: 20, moqUnit: 'MT', price: 1100, currency: 'USD', description: 'High quality dehydrated white onion flakes.', specs: { moisture: '< 5%', size: '3-6mm' }, isActive: true, createdBy: admin._id },
    { name: 'Coriander Seeds', category: 'spices', origin: 'Rajasthan, India', quality: 'Grade A Export', MOQ: 10, moqUnit: 'MT', price: 1450, currency: 'USD', description: 'Eagle grade coriander seeds.', specs: { moisture: '< 9%', purity: '99%' }, isActive: true, createdBy: admin._id },
    { name: 'Turmeric Finger', category: 'spices', origin: 'Erode, Tamil Nadu, India', quality: 'Erode Polished', MOQ: 10, moqUnit: 'MT', price: 2100, currency: 'USD', description: 'Premium Erode variety turmeric fingers.', specs: { moisture: '< 12%', curcumin: '> 3%' }, isActive: true, createdBy: admin._id },
    { name: 'Black Pepper (500GL)', category: 'spices', origin: 'Kerala, India', quality: 'Malabar Garbled', MOQ: 5, moqUnit: 'MT', price: 6200, currency: 'USD', description: 'Malabar black pepper 500GL.', specs: { moisture: '< 12%', density: '500g/L' }, isActive: true, createdBy: admin._id },
    { name: 'Dried Mango Powder (Amchur)', category: 'dehydrated', origin: 'Uttar Pradesh, India', quality: 'Food Grade', MOQ: 5, moqUnit: 'MT', price: 1800, currency: 'USD', description: 'Raw mango powder, naturally dried.', specs: { moisture: '< 8%', acidity: '> 2%' }, isActive: true, createdBy: admin._id },
    { name: 'Fenugreek Seeds', category: 'spices', origin: 'Rajasthan, India', quality: 'Export Grade', MOQ: 10, moqUnit: 'MT', price: 950, currency: 'USD', description: 'Machine cleaned fenugreek seeds.', specs: { moisture: '< 10%', purity: '99%' }, isActive: true, createdBy: admin._id },
  ]);
  console.log('Products created');

  const rfqs = await RFQ.insertMany([
    { buyer: buyer._id, product: products[0]._id, quantity: 50, unit: 'MT', targetPrice: 2700, currency: 'USD', deliveryDate: new Date('2024-10-15'), deliveryPort: 'Jebel Ali, Dubai', message: 'Need FAQ grade, HACCP certified', status: 'quoted', quotedPrice: 2820, adminNotes: 'Price negotiated, buyer agreed to 2820 USD/MT' },
    { buyer: buyer._id, product: products[2]._id, quantity: 100, unit: 'MT', targetPrice: 1000, currency: 'USD', deliveryDate: new Date('2024-11-01'), deliveryPort: 'Jebel Ali, Dubai', message: 'Regular monthly order, need consistent quality', status: 'pending' },
    { buyer: buyer._id, product: products[4]._id, quantity: 25, unit: 'MT', targetPrice: 2000, currency: 'USD', deliveryDate: new Date('2024-12-01'), deliveryPort: 'Rotterdam, Netherlands', message: 'Organic certified preferred', status: 'accepted', quotedPrice: 2050 },
  ]);
  console.log('RFQs created');

  const orders = await Order.insertMany([
    { rfq: rfqs[0]._id, buyer: buyer._id, product: products[0]._id, quantity: 50, unit: 'MT', price: 2820, currency: 'USD', totalValue: 141000, status: 'shipped', documents: [{ type: 'Bill of Lading', name: 'BL-2024-001.pdf', url: '/docs/BL-2024-001.pdf' }, { type: 'Certificate of Origin', name: 'COO-2024-001.pdf', url: '/docs/COO-2024-001.pdf' }, { type: 'Phytosanitary', name: 'PHY-2024-001.pdf', url: '/docs/PHY-2024-001.pdf' }] },
    { rfq: rfqs[2]._id, buyer: buyer._id, product: products[4]._id, quantity: 25, unit: 'MT', price: 2050, currency: 'USD', totalValue: 51250, status: 'processing', documents: [{ type: 'Proforma Invoice', name: 'PI-2024-002.pdf', url: '/docs/PI-2024-002.pdf' }] },
  ]);
  console.log('Orders created');

  await Shipment.insertMany([
    {
      order: orders[0]._id, containerNo: 'MSCU1234567', blNumber: 'MSCUIND24081001', vessel: 'MSC Beatrice', origin: 'Mundra Port, Gujarat, India', destination: 'Jebel Ali Port, Dubai, UAE', status: 'in-transit', estimatedArrival: new Date('2024-09-10'),
      updates: [
        { status: 'loading', location: 'Mundra Port, India', description: 'Container stuffing complete', timestamp: new Date('2024-08-15') },
        { status: 'loading', location: 'Mundra Port, India', description: 'Vessel departed Mundra', timestamp: new Date('2024-08-18') },
        { status: 'in-transit', location: 'Arabian Sea', description: 'In transit via Arabian Sea', timestamp: new Date('2024-08-22') },
      ],
    },
  ]);
  console.log('Shipments created');

  await CropListing.insertMany([
    { farmer: farmer._id, cropType: 'Cumin', quantity: 500, unit: 'quintal', harvestDate: new Date('2024-04-15'), askingPrice: 18500, priceCurrency: 'INR', location: 'Unjha', district: 'Mehsana', state: 'Gujarat', quality: 'A', status: 'available', sellIntent: true },
    { farmer: farmer._id, cropType: 'Coriander', quantity: 300, unit: 'quintal', harvestDate: new Date('2024-03-20'), askingPrice: 8800, priceCurrency: 'INR', location: 'Sanchor', district: 'Jalore', state: 'Rajasthan', quality: 'A', status: 'available', sellIntent: true },
    { farmer: farmer._id, cropType: 'Fenugreek', quantity: 200, unit: 'quintal', harvestDate: new Date('2024-04-01'), askingPrice: 6200, priceCurrency: 'INR', location: 'Nagaur', district: 'Nagaur', state: 'Rajasthan', quality: 'B', status: 'available', sellIntent: false },
  ]);
  console.log('Crop listings created');

  // Market data - 6 months of price data
  const commodities = ['Cumin', 'Turmeric', 'Coriander', 'Dehydrated Onion', 'Black Pepper'];
  const basePrices = { Cumin: 2800, Turmeric: 1800, Coriander: 1200, 'Dehydrated Onion': 900, 'Black Pepper': 6000 };
  const marketDocs = [];
  const now = new Date();
  for (let m = 5; m >= 0; m--) {
    const date = new Date(now.getFullYear(), now.getMonth() - m, 1);
    commodities.forEach((c) => {
      const base = basePrices[c];
      const variance = base * 0.08;
      marketDocs.push({ commodity: c, price: Math.round(base + (Math.random() - 0.5) * variance), currency: 'USD', unit: 'per MT', country: 'India', date, source: 'APMC', trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'stable' : 'down' });
      marketDocs.push({ commodity: c, price: Math.round(base * 1.15 + (Math.random() - 0.5) * variance), currency: 'USD', unit: 'per MT', country: 'UAE', date, source: 'Dubai DMCC', trend: 'up' });
      marketDocs.push({ commodity: c, price: Math.round(base * 1.22 + (Math.random() - 0.5) * variance), currency: 'USD', unit: 'per MT', country: 'Germany', date, source: 'Hamburg Exchange', trend: Math.random() > 0.4 ? 'up' : 'stable' });
    });
  }
  await MarketData.insertMany(marketDocs);
  console.log('Market data created');

  console.log('\n=== SEED COMPLETE ===');
  console.log('Login credentials:');
  console.log('Buyer:      buyer@demo.com / password123');
  console.log('Farmer:     farmer@demo.com / password123');
  console.log('Admin:      admin@demo.com / password123');
  console.log('SuperAdmin: superadmin@demo.com / password123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
