import React from 'react';
import Sidebar from '../../components/Sidebar';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 420, orders: 18 }, { month: 'Feb', revenue: 380, orders: 14 },
  { month: 'Mar', revenue: 510, orders: 22 }, { month: 'Apr', revenue: 470, orders: 19 },
  { month: 'May', revenue: 620, orders: 28 }, { month: 'Jun', revenue: 580, orders: 24 },
  { month: 'Jul', revenue: 710, orders: 31 }, { month: 'Aug', revenue: 690, orders: 29 },
];

const commodityShare = [
  { name: 'Cumin', value: 35, color: '#16a34a' },
  { name: 'Turmeric', value: 20, color: '#22c55e' },
  { name: 'Dehydrated', value: 25, color: '#4ade80' },
  { name: 'Coriander', value: 12, color: '#86efac' },
  { name: 'Others', value: 8, color: '#bbf7d0' },
];

const Analytics = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-500 mt-1">Comprehensive export performance and revenue analytics</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue & Orders Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#16a34a" name="Revenue ($K)" radius={[4,4,0,0]} />
              <Bar yAxisId="right" dataKey="orders" fill="#86efac" name="Orders" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Commodity Export Share</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={commodityShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name} ${value}%`}>
                {commodityShare.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue Growth Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`$${v}K`]} />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} dot={{ r: 5 }} name="Revenue ($K)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  </div>
);

export default Analytics;
