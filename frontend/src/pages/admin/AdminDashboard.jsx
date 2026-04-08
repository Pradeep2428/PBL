import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Users, FileText, Truck, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const DEMO_RFQS = [
  { _id: '1', buyer: { name: 'Ahmed Al Rashid', companyName: 'Al Rashid Trading' }, product: { name: 'Cumin Whole' }, quantity: 50, status: 'pending', createdAt: '2024-08-20' },
  { _id: '2', buyer: { name: 'James Wilson', companyName: 'SpicePro USA' }, product: { name: 'Turmeric Finger' }, quantity: 100, status: 'quoted', quotedPrice: 2050, createdAt: '2024-08-18' },
  { _id: '3', buyer: { name: 'Maria Schmidt', companyName: 'Gewürze GmbH' }, product: { name: 'Black Pepper' }, quantity: 20, status: 'accepted', createdAt: '2024-08-15' },
];

const statusBadge = (s) => ({ pending: 'badge-yellow', quoted: 'badge-blue', accepted: 'badge-green', rejected: 'badge-red' }[s] || 'badge-blue');

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rfqs, setRFQs] = useState(DEMO_RFQS);

  useEffect(() => {
    api.get('/api/admin/users').then(r => setUsers(r.data)).catch(() => {
      setUsers([
        { _id: '1', name: 'Ahmed Al Rashid', role: 'buyer', isApproved: true, createdAt: new Date() },
        { _id: '2', name: 'John Smith', role: 'buyer', isApproved: false, createdAt: new Date() },
        { _id: '3', name: 'Ramesh Patel', role: 'farmer', isApproved: true, createdAt: new Date() },
        { _id: '4', name: 'Suresh Kumar', role: 'farmer', isApproved: false, createdAt: new Date() },
      ]);
    });
    api.get('/api/admin/rfqs').then(r => setRFQs(r.data)).catch(() => {});
  }, []);

  const pendingApprovals = users.filter(u => !u.isApproved && ['buyer','farmer'].includes(u.role));
  const stats = [
    { label: 'Total Buyers', value: users.filter(u => u.role === 'buyer').length || 12, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Farmers', value: users.filter(u => u.role === 'farmer').length || 8, icon: Users, color: 'text-green-600 bg-green-50' },
    { label: 'Pending Approvals', value: pendingApprovals.length || 4, icon: Clock, color: 'text-orange-600 bg-orange-50' },
    { label: 'Active RFQs', value: rfqs.filter(r => ['pending','quoted'].includes(r.status)).length, icon: FileText, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Platform operations overview</p>
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
              <h2 className="font-semibold text-gray-900">Recent RFQs</h2>
              <Link to="/admin/rfqs" className="text-sm text-green-600 hover:underline flex items-center gap-1">Manage <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {rfqs.slice(0, 4).map(r => (
                <div key={r._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{r.product?.name}</div>
                    <div className="text-xs text-gray-400">{r.buyer?.companyName || r.buyer?.name} · {r.quantity} MT</div>
                  </div>
                  <span className={statusBadge(r.status)}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Approval Queue</h2>
              <Link to="/admin/users" className="text-sm text-green-600 hover:underline flex items-center gap-1">Manage Users <ArrowRight className="h-3 w-3" /></Link>
            </div>
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p className="text-sm">All users approved</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pendingApprovals.slice(0, 5).map(u => (
                  <div key={u._id} className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-xl p-3">
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{u.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{u.role} · Pending review</div>
                    </div>
                    <Link to="/admin/users" className="text-xs text-green-600 font-medium hover:underline">Review</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { to: '/admin/users', icon: Users, label: 'Manage Users', desc: 'Approve / reject registrations', color: 'bg-blue-100 text-blue-600' },
            { to: '/admin/rfqs', icon: FileText, label: 'RFQ Management', desc: 'Send quotes to buyers', color: 'bg-purple-100 text-purple-600' },
            { to: '/admin/logistics', icon: Truck, label: 'Logistics', desc: 'Update shipment status', color: 'bg-orange-100 text-orange-600' },
          ].map(q => (
            <Link key={q.to} to={q.to} className="card hover:shadow-lg transition-shadow flex items-center gap-4 group">
              <div className={`p-3 rounded-xl ${q.color}`}><q.icon className="h-5 w-5" /></div>
              <div><div className="font-semibold text-gray-900">{q.label}</div><div className="text-sm text-gray-500">{q.desc}</div></div>
              <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
