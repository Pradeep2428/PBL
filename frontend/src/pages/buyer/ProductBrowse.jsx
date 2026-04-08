import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Search, Filter, Package, MapPin, ArrowRight } from 'lucide-react';

const DEMO_PRODUCTS = [
  { _id: '1', name: 'Cumin Whole (Jeera)', category: 'cumin', origin: 'Unjha, Gujarat', quality: 'FAQ Grade', MOQ: 10, moqUnit: 'MT', price: 2850, currency: 'USD', description: 'Premium cumin seeds from Unjha, 99.5% purity.', isActive: true },
  { _id: '2', name: 'Cumin Powder', category: 'cumin', origin: 'Gujarat', quality: 'Premium Ground', MOQ: 5, moqUnit: 'MT', price: 3200, currency: 'USD', description: 'Finely ground cumin with high volatile oil.', isActive: true },
  { _id: '3', name: 'Dehydrated Onion Flakes', category: 'dehydrated', origin: 'Mahuva, Gujarat', quality: 'Export Grade A', MOQ: 20, moqUnit: 'MT', price: 1100, currency: 'USD', description: 'White onion flakes, moisture < 5%.', isActive: true },
  { _id: '4', name: 'Coriander Seeds', category: 'spices', origin: 'Rajasthan', quality: 'Grade A Export', MOQ: 10, moqUnit: 'MT', price: 1450, currency: 'USD', description: 'Eagle grade coriander, superior aroma.', isActive: true },
  { _id: '5', name: 'Turmeric Finger', category: 'spices', origin: 'Erode, Tamil Nadu', quality: 'Erode Polished', MOQ: 10, moqUnit: 'MT', price: 2100, currency: 'USD', description: 'Premium Erode turmeric, curcumin > 3%.', isActive: true },
  { _id: '6', name: 'Black Pepper (500GL)', category: 'spices', origin: 'Kerala', quality: 'Malabar Garbled', MOQ: 5, moqUnit: 'MT', price: 6200, currency: 'USD', description: 'Malabar bold black pepper 500GL.', isActive: true },
  { _id: '7', name: 'Dried Mango Powder', category: 'dehydrated', origin: 'Uttar Pradesh', quality: 'Food Grade', MOQ: 5, moqUnit: 'MT', price: 1800, currency: 'USD', description: 'Natural amchur powder, acidity > 2%.', isActive: true },
  { _id: '8', name: 'Fenugreek Seeds', category: 'spices', origin: 'Rajasthan', quality: 'Export Grade', MOQ: 10, moqUnit: 'MT', price: 950, currency: 'USD', description: 'Machine cleaned methi seeds, purity 99%.', isActive: true },
];

const categoryColors = { cumin: 'bg-yellow-100 text-yellow-800', spices: 'bg-orange-100 text-orange-800', dehydrated: 'bg-blue-100 text-blue-800', grains: 'bg-green-100 text-green-800' };

const ProductBrowse = () => {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    api.get('/api/products').then(r => setProducts(r.data)).catch(() => {});
  }, []);

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || !search) &&
    (p.category === category || !category)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Browse Products</h1>
          <p className="text-gray-500 mt-1">Explore {products.length} premium agri-commodities from India</p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm appearance-none bg-white">
              <option value="">All Categories</option>
              <option value="cumin">Cumin</option>
              <option value="spices">Spices</option>
              <option value="dehydrated">Dehydrated</option>
              <option value="grains">Grains</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p._id} className="card hover:shadow-lg transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[p.category] || 'bg-gray-100 text-gray-700'}`}>
                  {p.category}
                </span>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">✓ Verified</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900">{p.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                <MapPin className="h-3.5 w-3.5" /> {p.origin}
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xl font-bold text-green-600">${p.price}<span className="text-sm text-gray-400 font-normal">/MT</span></div>
                  <div className="text-xs text-gray-400">MOQ: {p.MOQ} {p.moqUnit}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{p.quality}</div>
                </div>
              </div>
              <Link to={`/buyer/rfq?product=${p._id}&productName=${encodeURIComponent(p.name)}`}
                className="w-full btn-primary text-sm flex items-center justify-center gap-2 group-hover:bg-green-700">
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductBrowse;
