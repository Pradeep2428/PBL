import React from 'react';
import Sidebar from '../../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

const advisories = [
  {
    commodity: 'Cumin', action: 'SELL', confidence: 87, color: 'bg-green-500', textColor: 'text-green-700', border: 'border-green-200', bg: 'bg-green-50',
    reason: 'Turkey drought reduced global supply by 30%. UAE buyers are stocking up ahead of winter. International prices at 18-month high.',
    targetPrice: 3200, currency: 'USD/MT', validDays: 7,
    forecast: [
      { week: 'Now', price: 3050 }, { week: 'W+1', price: 3150 }, { week: 'W+2', price: 3200 }, { week: 'W+3', price: 3180 }, { week: 'W+4', price: 3100 },
    ],
    alerts: ['UAE: 500 MT demand (URGENT)', 'Germany: 200 MT for Q4 import', 'USA: Retail chain inquiry for 300 MT'],
  },
  {
    commodity: 'Coriander', action: 'HOLD', confidence: 72, color: 'bg-yellow-500', textColor: 'text-yellow-700', border: 'border-yellow-200', bg: 'bg-yellow-50',
    reason: 'EU harvest season ending in 3 weeks. Prices expected to rise 8% by mid-September. Hold for better price realization.',
    targetPrice: 1600, currency: 'USD/MT', validDays: 21,
    forecast: [
      { week: 'Now', price: 1450 }, { week: 'W+1', price: 1480 }, { week: 'W+2', price: 1530 }, { week: 'W+3', price: 1590 }, { week: 'W+4', price: 1600 },
    ],
    alerts: ['EU harvest ending – price uptick likely', 'Bangladesh steady demand 150 MT/month'],
  },
  {
    commodity: 'Dehydrated Onion', action: 'STORE', confidence: 65, color: 'bg-blue-500', textColor: 'text-blue-700', border: 'border-blue-200', bg: 'bg-blue-50',
    reason: 'Current prices $1,100 are below 12-month average of $1,280. Store in good conditions for 4-6 weeks for 15-18% better returns.',
    targetPrice: 1300, currency: 'USD/MT', validDays: 42,
    forecast: [
      { week: 'Now', price: 1100 }, { week: 'W+2', price: 1150 }, { week: 'W+4', price: 1220 }, { week: 'W+6', price: 1290 }, { week: 'W+8', price: 1300 },
    ],
    alerts: ['USA: Large inquiry expected Dec 2024', 'Japan: 200 MT RFQ expected in 6 weeks'],
  },
];

const actionIcons = { SELL: <TrendingUp className="h-5 w-5" />, HOLD: <Minus className="h-5 w-5" />, STORE: <TrendingDown className="h-5 w-5" /> };

const AIAdvisory = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-100 p-2 rounded-xl"><Brain className="h-6 w-6 text-purple-600" /></div>
          <h1 className="text-2xl font-bold text-gray-900">AI Farmer Advisory</h1>
        </div>
        <p className="text-gray-500 mt-1">Personalized SELL / HOLD / STORE recommendations based on real-time global market data</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-600 font-medium">Updated 2 hours ago · Next update in 6 hours</span>
        </div>
      </div>

      <div className="space-y-6">
        {advisories.map(a => (
          <div key={a.commodity} className={`card border-l-4 ${a.border}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{a.commodity}</h2>
                <p className="text-sm text-gray-500">Valid for {a.validDays} days · Target: {a.currency} {a.targetPrice}</p>
              </div>
              <div className={`${a.color} text-white flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg shadow-md`}>
                {actionIcons[a.action]} {a.action}
              </div>
            </div>

            <div className={`${a.bg} ${a.border} border rounded-xl p-4 mb-4`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 ${a.textColor} mt-0.5 flex-shrink-0`} />
                <div>
                  <p className={`text-sm font-medium ${a.textColor}`}>Advisory Reasoning</p>
                  <p className="text-sm text-gray-700 mt-1">{a.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className={`text-xs ${a.textColor} font-medium`}>Confidence: {a.confidence}%</div>
                <div className="flex-1 bg-white rounded-full h-1.5">
                  <div className={`${a.color} h-1.5 rounded-full`} style={{ width: `${a.confidence}%` }} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Price Forecast (USD/MT)</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={a.forecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={50} />
                    <Tooltip formatter={(v) => [`$${v}`]} />
                    <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Demand Alerts</h3>
                <div className="space-y-2">
                  {a.alerts.map((alert, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      {alert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default AIAdvisory;
