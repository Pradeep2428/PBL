import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { FileText, Package, Truck, TrendingUp, Plus, ArrowRight, Clock } from 'lucide-react';

const DEMO_ORDERS = [
  { _id: '1', product: { name: 'Cumin Whole (Jeera)' }, quantity: 50, unit: 'MT', price: 2820, status: 'shipped', createdAt: '2024-08-15' },
  { _id: '2', product: { name: 'Turmeric Finger' }, quantity: 25, unit: 'MT', price: 2050, status: 'processing', createdAt: '2024-08-20' },
];

const DEMO_RFQS = [
  { _id: '1', product: { name: 'Cumin Whole' }, quantity: 50, status: 'quoted', quotedPrice: 2820 },
  { _id: '2', product: { name: 'Dehydrated Onion' }, quantity: 100, status: 'pending', quotedPrice: null },
  { _id: '3', product: { name: 'Turmeric Finger' }, quantity: 25, status: 'accepted', quotedPrice: 2050 },
];

const statusBadge = (s) => ({
  placed: 'badge-blue', processing: 'badge-yellow', shipped: 'badge-green',
  delivered: 'bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium',
  cancelled: 'badge-red', pending: 'badge-yellow', quoted: 'badge-blue', accepted: 'badge-green', rejected: 'badge-red',
}[s] || 'badge-blue');

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [rfqs, setRFQs] = useState(DEMO_RFQS);

  useEffect(() => {
    api.get('/api/buyers/orders').then(r => setOrders(r.data)).catch(() => {});
    api.get('/api/buyers/rfqs').then(r => setRFQs(r.data)).catch(() => {});
  }, []);

  const stats = [
    { label: 'Active RFQs', value: rfqs.filter(r => ['pending','quoted'].includes(r.status)).length, icon: FileText, color: 'text-blue-600 bg-blue-50', change: '+2 this week' },
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-green-600 bg-green-50', change: '+1 this month' },
    { label: 'In Shipment', value: orders.filter(o => o.status === 'shipped').length, icon: Truck, color: 'text-orange-600 bg-orange-50', change: 'On track' },
    { label: 'Total Spend', value: '$192K', icon: TrendingUp, color: 'text-purple-600 bg-purple-50', change: '+15% vs last month' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-gray-500 mt-1">{user?.companyName || 'Your Company'} · Buyer Account</p>
          </div>
          <Link to="/buyer/rfq" className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="h-4 w-4" /> New RFQ
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
              <div className="text-xs text-gray-400 mt-1">{s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Recent Orders</h2>
              <Link to="/buyer/orders" className="text-sm text-green-600 hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {orders.slice(0, 4).map(o => (
                <div key={o._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{o.product?.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {new Date(o.createdAt).toLocaleDateString()} · {o.quantity} {o.unit}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={statusBadge(o.status)}>{o.status}</span>
                    <div className="text-xs text-gray-500 mt-1">${(o.quantity * o.price).toLocaleString()}</div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No orders yet</p>}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">My RFQs</h2>
              <Link to="/buyer/rfq" className="text-sm text-green-600 hover:underline flex items-center gap-1">New RFQ <Plus className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {rfqs.slice(0, 4).map(r => (
                <div key={r._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{r.product?.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.quantity} MT requested</div>
                  </div>
                  <div className="text-right">
                    <span className={statusBadge(r.status)}>{r.status}</span>
                    {r.quotedPrice && <div className="text-xs text-green-600 font-medium mt-1">${r.quotedPrice}/MT</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Link to="/buyer/products" className="card hover:shadow-lg transition-shadow flex items-center gap-4 group">
            <div className="bg-green-100 p-3 rounded-xl"><Package className="h-6 w-6 text-green-600" /></div>
            <div>
              <div className="font-semibold text-gray-900">Browse Products</div>
              <div className="text-sm text-gray-500">Explore 50+ premium agri commodities</div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
          </Link>
          <Link to="/buyer/rfq" className="card hover:shadow-lg transition-shadow flex items-center gap-4 group">
            <div className="bg-blue-100 p-3 rounded-xl"><FileText className="h-6 w-6 text-blue-600" /></div>
            <div>
              <div className="font-semibold text-gray-900">Request a Quote</div>
              <div className="text-sm text-gray-500">Get competitive pricing in 24 hours</div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
