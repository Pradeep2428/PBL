import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { Globe, TrendingUp, Users, Package, ArrowRight } from 'lucide-react';

const DEMO_DATA = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 420 }, { month: 'Feb', revenue: 380 }, { month: 'Mar', revenue: 510 },
    { month: 'Apr', revenue: 470 }, { month: 'May', revenue: 620 }, { month: 'Jun', revenue: 580 },
    { month: 'Jul', revenue: 710 }, { month: 'Aug', revenue: 690 }, { month: 'Sep', revenue: 780 },
    { month: 'Oct', revenue: 820 }, { month: 'Nov', revenue: 760 }, { month: 'Dec', revenue: 900 },
  ],
  commodityPerformance: [
    { commodity: 'Cumin', exports: 1240, revenue: 3968, growth: 18 },
    { commodity: 'Turmeric', exports: 980, revenue: 1960, growth: 12 },
    { commodity: 'Dehydrated Onion', exports: 2100, revenue: 2310, growth: 24 },
    { commodity: 'Coriander', exports: 760, revenue: 1140, growth: 8 },
    { commodity: 'Black Pepper', exports: 320, revenue: 1920, growth: 15 },
  ],
  countryDemand: [
    { country: '🇦🇪 UAE', demand: 94, volume: '850 MT', revenue: '$2.1M' },
    { country: '🇺🇸 USA', demand: 88, volume: '720 MT', revenue: '$1.9M' },
    { country: '🇩🇪 Germany', demand: 76, volume: '420 MT', revenue: '$1.1M' },
    { country: '🇬🇧 UK', demand: 72, volume: '310 MT', revenue: '$0.8M' },
    { country: '🇸🇦 Saudi Arabia', demand: 78, volume: '490 MT', revenue: '$1.2M' },
  ],
};

const SuperAdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/api/superadmin/analytics').then(r => setAnalytics(r.data)).catch(() => {});
  }, []);

  const revenue = analytics?.monthlyRevenue || DEMO_DATA.monthlyRevenue;
  const performance = analytics?.commodityPerformance || DEMO_DATA.commodityPerformance;

  const kpis = [
    { label: 'Total Exports', value: '$7.3M', sub: 'FY 2024', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Countries Served', value: analytics?.countriesServed || 24, sub: 'Active markets', icon: Globe, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Suppliers', value: analytics?.activeSuppliers || 142, sub: 'Verified farmers', icon: Package, color: 'text-orange-600 bg-orange-50' },
    { label: 'Trust Score Avg', value: `${analytics?.avgTrustScore || 78}/100`, sub: 'Across all users', icon: Users, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Platform-wide analytics and performance overview</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map(k => (
            <div key={k.label} className="card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{k.label}</span>
                <div className={`p-2 rounded-lg ${k.color}`}><k.icon className="h-4 w-4" /></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
              <div className="text-xs text-gray-400 mt-1">{k.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Monthly Revenue ($K)</h2>
              <Link to="/superadmin/analytics" className="text-sm text-green-600 hover:underline flex items-center gap-1">Full Report <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`$${v}K`]} />
                <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Country Demand Heatmap</h2>
            <div className="space-y-3">
              {DEMO_DATA.countryDemand.map(c => (
                <div key={c.country} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">{c.country}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all" style={{ width: `${c.demand}%` }} />
                  </div>
                  <div className="text-xs text-gray-500 w-12 flex-shrink-0">{c.demand}%</div>
                  <div className="text-xs font-medium text-green-600 w-14 flex-shrink-0">{c.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Commodity Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-3">Commodity</th>
                  <th className="text-right text-gray-500 font-medium pb-3">Exports (MT)</th>
                  <th className="text-right text-gray-500 font-medium pb-3">Revenue ($K)</th>
                  <th className="text-right text-gray-500 font-medium pb-3">Growth</th>
                  <th className="text-left text-gray-500 font-medium pb-3 pl-4">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {performance.map(p => (
                  <tr key={p.commodity} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{p.commodity}</td>
                    <td className="py-3 text-right text-gray-600">{(p.exports || 0).toLocaleString()}</td>
                    <td className="py-3 text-right text-gray-600">${(p.revenue || 0).toLocaleString()}</td>
                    <td className="py-3 text-right font-bold text-green-600">+{p.growth}%</td>
                    <td className="py-3 pl-4">
                      <div className="w-24 bg-gray-100 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(p.growth * 3, 100)}%` }} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
