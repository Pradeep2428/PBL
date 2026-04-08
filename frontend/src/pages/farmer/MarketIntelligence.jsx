import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const DEMO_DATA = {
  Cumin: [
    { month: 'Mar', price: 2650, uae: 2980, eu: 3100 }, { month: 'Apr', price: 2750, uae: 3050, eu: 3180 },
    { month: 'May', price: 2820, uae: 3120, eu: 3250 }, { month: 'Jun', price: 2900, uae: 3200, eu: 3380 },
    { month: 'Jul', price: 3050, uae: 3350, eu: 3520 }, { month: 'Aug', price: 3200, uae: 3580, eu: 3720 },
  ],
  Turmeric: [
    { month: 'Mar', price: 1780, uae: 1950, eu: 2100 }, { month: 'Apr', price: 1820, uae: 2000, eu: 2150 },
    { month: 'May', price: 1850, uae: 2050, eu: 2200 }, { month: 'Jun', price: 1900, uae: 2100, eu: 2280 },
    { month: 'Jul', price: 1980, uae: 2200, eu: 2350 }, { month: 'Aug', price: 2100, uae: 2320, eu: 2480 },
  ],
  Coriander: [
    { month: 'Mar', price: 1180, uae: 1320, eu: 1420 }, { month: 'Apr', price: 1200, uae: 1350, eu: 1450 },
    { month: 'May', price: 1230, uae: 1380, eu: 1490 }, { month: 'Jun', price: 1280, uae: 1430, eu: 1540 },
    { month: 'Jul', price: 1350, uae: 1500, eu: 1620 }, { month: 'Aug', price: 1450, uae: 1600, eu: 1720 },
  ],
};

const countryDemand = [
  { country: '🇦🇪 UAE', cumin: 'HIGH', turmeric: 'MEDIUM', dehydrated: 'HIGH', score: 94 },
  { country: '🇺🇸 USA', cumin: 'MEDIUM', turmeric: 'HIGH', dehydrated: 'HIGH', score: 88 },
  { country: '🇩🇪 Germany', cumin: 'HIGH', turmeric: 'MEDIUM', dehydrated: 'MEDIUM', score: 76 },
  { country: '🇬🇧 UK', cumin: 'MEDIUM', turmeric: 'HIGH', dehydrated: 'LOW', score: 72 },
  { country: '🇸🇦 Saudi Arabia', cumin: 'HIGH', turmeric: 'LOW', dehydrated: 'HIGH', score: 78 },
];

const demandColor = { HIGH: 'text-green-600 font-bold', MEDIUM: 'text-yellow-600', LOW: 'text-gray-400' };

const MarketIntelligence = () => {
  const [commodity, setCommodity] = useState('Cumin');
  const [data, setData] = useState(DEMO_DATA);

  useEffect(() => {
    api.get('/api/market/commodity-trends').then(r => {
      if (r.data && Object.keys(r.data).length > 0) setData(r.data);
    }).catch(() => {});
  }, []);

  const chartData = data[commodity] || DEMO_DATA[commodity] || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="text-gray-500 mt-1">Live commodity prices and demand signals from global markets</p>
        </div>

        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Price Trend (USD/MT)</h2>
            <div className="flex gap-2">
              {Object.keys(DEMO_DATA).map(c => (
                <button key={c} onClick={() => setCommodity(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${commodity === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}`, '']} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} name="India (FOB)" />
              <Line type="monotone" dataKey="uae" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="UAE Market" />
              <Line type="monotone" dataKey="eu" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="EU Market" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Country Demand Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-3">Country</th>
                  <th className="text-center text-gray-500 font-medium pb-3">Cumin</th>
                  <th className="text-center text-gray-500 font-medium pb-3">Turmeric</th>
                  <th className="text-center text-gray-500 font-medium pb-3">Dehydrated</th>
                  <th className="text-center text-gray-500 font-medium pb-3">Demand Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {countryDemand.map(d => (
                  <tr key={d.country} className="hover:bg-gray-50">
                    <td className="py-3 font-medium">{d.country}</td>
                    <td className={`py-3 text-center text-xs ${demandColor[d.cumin]}`}>{d.cumin}</td>
                    <td className={`py-3 text-center text-xs ${demandColor[d.turmeric]}`}>{d.turmeric}</td>
                    <td className={`py-3 text-center text-xs ${demandColor[d.dehydrated]}`}>{d.dehydrated}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${d.score}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{d.score}</span>
                      </div>
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

export default MarketIntelligence;
