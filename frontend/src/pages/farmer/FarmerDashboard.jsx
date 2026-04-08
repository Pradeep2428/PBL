import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { Sprout, TrendingUp, Brain, AlertTriangle, ArrowRight, Plus } from 'lucide-react';

const advisories = [
  { commodity: 'Cumin', action: 'SELL', confidence: 87, reason: 'Turkey drought reduced global supply by 30%. UAE demand surging. Lock in prices now.', color: 'bg-green-500' },
  { commodity: 'Coriander', action: 'HOLD', confidence: 72, reason: 'EU harvest season ending. Prices expected to rise 8% in 3 weeks.', color: 'bg-yellow-500' },
  { commodity: 'Dehydrated Onion', action: 'STORE', confidence: 65, reason: 'Current prices below fair value. Hold for 4-6 weeks for better returns.', color: 'bg-blue-500' },
];

const demandAlerts = [
  { country: '🇦🇪 UAE', commodity: 'Cumin', qty: '500 MT', urgency: 'URGENT', color: 'bg-red-50 border-red-200 text-red-700' },
  { country: '🇺🇸 USA', commodity: 'Dehydrated Onion', qty: '1000 MT', urgency: 'HIGH', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { country: '🇩🇪 Germany', commodity: 'Turmeric', qty: '200 MT', urgency: 'MEDIUM', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
];

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    api.get('/api/farmers/crops').then(r => setCrops(r.data)).catch(() => {
      setCrops([
        { _id: '1', cropType: 'Cumin', quantity: 500, unit: 'quintal', status: 'available', askingPrice: 18500 },
        { _id: '2', cropType: 'Coriander', quantity: 300, unit: 'quintal', status: 'available', askingPrice: 8800 },
      ]);
    });
  }, []);

  const stats = [
    { label: 'Active Listings', value: crops.filter(c => c.status === 'available').length || 2, icon: Sprout, color: 'text-green-600 bg-green-50' },
    { label: 'Demand Alerts', value: 3, icon: AlertTriangle, color: 'text-orange-600 bg-orange-50' },
    { label: 'AI Recommendations', value: advisories.length, icon: Brain, color: 'text-purple-600 bg-purple-50' },
    { label: 'Price Uptick', value: '+12%', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name?.split(' ')[0]}! 🌾</h1>
            <p className="text-gray-500 mt-1">{user?.companyName || 'Your Farm'} · Gujarat, India</p>
          </div>
          <Link to="/farmer/crops" className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="h-4 w-4" /> List Crop
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{s.label}</span>
                <div className={`p-2 rounded-lg ${s.color}`}><s.icon className="h-4 w-4" /></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Brain className="h-4 w-4 text-purple-500" /> AI Advisory</h2>
              <Link to="/farmer/advisory" className="text-sm text-green-600 hover:underline flex items-center gap-1">Full Report <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {advisories.map(a => (
                <div key={a.commodity} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`${a.color} text-white font-bold text-xs px-2 py-1 rounded-lg w-12 text-center`}>{a.action}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm">{a.commodity}</div>
                    <div className="text-xs text-gray-500 truncate">{a.reason}</div>
                  </div>
                  <div className="text-xs text-gray-400 flex-shrink-0">{a.confidence}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-500" /> Demand Alerts</h2>
              <Link to="/farmer/market" className="text-sm text-green-600 hover:underline flex items-center gap-1">View Market <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {demandAlerts.map((a, i) => (
                <div key={i} className={`border rounded-xl p-3 ${a.color}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{a.country}</div>
                      <div className="text-xs mt-0.5">Needs {a.qty} of {a.commodity}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/60">{a.urgency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Link to="/farmer/crops" className="card hover:shadow-lg transition-shadow flex items-center gap-4 group">
            <div className="bg-green-100 p-3 rounded-xl"><Sprout className="h-6 w-6 text-green-600" /></div>
            <div><div className="font-semibold text-gray-900">My Crop Listings</div><div className="text-sm text-gray-500">Manage and update your crop inventory</div></div>
            <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
          </Link>
          <Link to="/farmer/market" className="card hover:shadow-lg transition-shadow flex items-center gap-4 group">
            <div className="bg-blue-100 p-3 rounded-xl"><TrendingUp className="h-6 w-6 text-blue-600" /></div>
            <div><div className="font-semibold text-gray-900">Market Intelligence</div><div className="text-sm text-gray-500">Live prices and demand trends</div></div>
            <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
