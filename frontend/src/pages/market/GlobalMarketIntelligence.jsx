import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { Globe, TrendingUp, Brain, Newspaper, AlertTriangle, Zap } from 'lucide-react';

const PRICE_DATA = {
  Cumin: [
    { month: 'Mar', india: 2650, uae: 2980, eu: 3100, usa: 3200 }, { month: 'Apr', india: 2750, uae: 3050, eu: 3180, usa: 3300 },
    { month: 'May', india: 2820, uae: 3120, eu: 3250, usa: 3380 }, { month: 'Jun', india: 2900, uae: 3200, eu: 3380, usa: 3500 },
    { month: 'Jul', india: 3050, uae: 3350, eu: 3520, usa: 3680 }, { month: 'Aug', india: 3200, uae: 3580, eu: 3720, usa: 3900 },
  ],
  Turmeric: [
    { month: 'Mar', india: 1780, uae: 1950, eu: 2100, usa: 2200 }, { month: 'Apr', india: 1820, uae: 2000, eu: 2150, usa: 2250 },
    { month: 'May', india: 1850, uae: 2050, eu: 2200, usa: 2320 }, { month: 'Jun', india: 1900, uae: 2100, eu: 2280, usa: 2400 },
    { month: 'Jul', india: 1980, uae: 2200, eu: 2350, usa: 2480 }, { month: 'Aug', india: 2100, uae: 2320, eu: 2480, usa: 2600 },
  ],
  'Dehydrated Onion': [
    { month: 'Mar', india: 950, uae: 1080, eu: 1150, usa: 1200 }, { month: 'Apr', india: 980, uae: 1100, eu: 1180, usa: 1230 },
    { month: 'May', india: 1000, uae: 1120, eu: 1200, usa: 1260 }, { month: 'Jun', india: 1020, uae: 1140, eu: 1230, usa: 1290 },
    { month: 'Jul', india: 1060, uae: 1180, eu: 1270, usa: 1340 }, { month: 'Aug', india: 1100, uae: 1230, eu: 1320, usa: 1400 },
  ],
  Coriander: [
    { month: 'Mar', india: 1180, uae: 1320, eu: 1420, usa: 1500 }, { month: 'Apr', india: 1200, uae: 1350, eu: 1450, usa: 1530 },
    { month: 'May', india: 1230, uae: 1380, eu: 1490, usa: 1570 }, { month: 'Jun', india: 1280, uae: 1430, eu: 1540, usa: 1630 },
    { month: 'Jul', india: 1350, uae: 1500, eu: 1620, usa: 1720 }, { month: 'Aug', india: 1450, uae: 1600, eu: 1720, usa: 1850 },
  ],
};

const impactEvents = [
  { event: 'Turkey Drought 2024', region: '🇹🇷 Turkey', severity: 'HIGH', impact: '+18% price', farmerAction: 'SELL NOW', commodity: 'Cumin', color: 'border-red-300 bg-red-50', actionColor: 'bg-green-500 text-white' },
  { event: 'EU Organic Import Surge', region: '🇪🇺 European Union', severity: 'MEDIUM', impact: '+12% demand', farmerAction: 'GET CERTIFIED', commodity: 'Turmeric', color: 'border-yellow-300 bg-yellow-50', actionColor: 'bg-blue-500 text-white' },
  { event: 'UAE Ramadan Stocking', region: '🇦🇪 UAE & GCC', severity: 'MEDIUM', impact: '+25% volume', farmerAction: 'PREPARE STOCK', commodity: 'All Spices', color: 'border-orange-300 bg-orange-50', actionColor: 'bg-orange-500 text-white' },
  { event: 'INR Depreciation', region: '🇮🇳 India', severity: 'LOW', impact: '+5% competitiveness', farmerAction: 'HOLD FOR RATES', commodity: 'All', color: 'border-blue-300 bg-blue-50', actionColor: 'bg-yellow-500 text-white' },
];

const advisories = [
  { commodity: 'Cumin', action: 'SELL', confidence: 87, bg: 'bg-green-500', reason: 'Turkey drought + UAE demand surge. 18-month price high.', alerts: ['UAE: 500 MT needed urgently', 'Germany: 200 MT Q4'] },
  { commodity: 'Turmeric', action: 'HOLD', confidence: 74, bg: 'bg-yellow-500', reason: 'EU organic demand growing. Prices expected +10% in 4 weeks.', alerts: ['EU organic premium +20%', 'USA: New retail chain inquiry'] },
  { commodity: 'Dehydrated', action: 'STORE', confidence: 68, bg: 'bg-blue-500', reason: 'Current prices below 12-month avg. Store for 4-6 weeks.', alerts: ['Japan: 200 MT expected Dec', 'USA: Large inquiry soon'] },
  { commodity: 'Coriander', action: 'SELL', confidence: 79, bg: 'bg-green-500', reason: 'Bangladesh monthly contracts available. EU season ending.', alerts: ['Bangladesh: 150 MT/month', 'Saudi: 80 MT inquiry'] },
];

const news = [
  { title: 'India Spice Exports Hit Record $4.1B in FY2024', source: 'Spices Board India', date: 'Aug 18, 2024', impact: 'positive', category: 'Exports' },
  { title: 'Turkey Cumin Crop Down 30% Due to Drought', source: 'Reuters Agri', date: 'Aug 15, 2024', impact: 'positive', category: 'Supply' },
  { title: 'EU New Pesticide MRL Regulations for Spice Imports', source: 'EFSA', date: 'Aug 12, 2024', impact: 'neutral', category: 'Regulation' },
  { title: 'UAE Food Import Demand Up 20% for Q4 2024', source: 'Dubai Chamber', date: 'Aug 10, 2024', impact: 'positive', category: 'Demand' },
  { title: 'India-UK FTA: Zero-Duty Access for Indian Spices', source: 'Economic Times', date: 'Aug 8, 2024', impact: 'positive', category: 'Policy' },
];

const impactColors = { positive: 'text-green-600 bg-green-50', negative: 'text-red-600 bg-red-50', neutral: 'text-gray-600 bg-gray-50' };

const GlobalMarketIntelligence = () => {
  const [activeCommodity, setActiveCommodity] = useState('Cumin');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-xl"><Globe className="h-6 w-6 text-blue-600" /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Global Market Intelligence</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">LIVE · Updated 2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Commodity Price Trends */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h2 className="font-bold text-gray-900 text-lg">Commodity Price Trends (USD/MT)</h2>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {Object.keys(PRICE_DATA).map(c => (
              <button key={c} onClick={() => setActiveCommodity(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCommodity === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={PRICE_DATA[activeCommodity]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}/MT`]} />
              <Legend />
              <Line type="monotone" dataKey="india" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} name="🇮🇳 India (FOB)" />
              <Line type="monotone" dataKey="uae" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="🇦🇪 UAE" />
              <Line type="monotone" dataKey="eu" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="🇪🇺 EU" />
              <Line type="monotone" dataKey="usa" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="🇺🇸 USA" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Section 2: Impact Analysis */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-orange-500" />
            <h2 className="font-bold text-gray-900 text-lg">Impact Analysis Engine</h2>
            <span className="text-xs text-gray-500">Global events → Indian market impact → Farmer action</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {impactEvents.map((e, i) => (
              <div key={i} className={`border-2 rounded-xl p-4 ${e.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">{e.event}</div>
                    <div className="text-sm text-gray-500">{e.region} · {e.commodity}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.severity === 'HIGH' ? 'bg-red-500 text-white' : e.severity === 'MEDIUM' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}>{e.severity}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium text-sm">{e.impact}</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${e.actionColor}`}>{e.farmerAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: AI Advisory */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-purple-600" />
            <h2 className="font-bold text-gray-900 text-lg">AI Farmer Advisory</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {advisories.map(a => (
              <div key={a.commodity} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{a.commodity}</span>
                  <span className={`${a.bg} text-white text-xs font-bold px-2 py-1 rounded-lg`}>{a.action}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{a.reason}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className={`${a.bg} h-1.5 rounded-full`} style={{ width: `${a.confidence}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{a.confidence}%</span>
                </div>
                <div className="space-y-1">
                  {a.alerts.map((al, i) => (
                    <div key={i} className="text-xs text-gray-600 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />{al}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: News Feed */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="h-5 w-5 text-blue-600" />
            <h2 className="font-bold text-gray-900 text-lg">Agri Trade News Feed</h2>
          </div>
          <div className="space-y-3">
            {news.map((n, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full ${impactColors[n.impact]}`}>{n.category}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{n.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{n.source} · {n.date}</div>
                </div>
                <div className={`text-xs font-medium flex-shrink-0 ${n.impact === 'positive' ? 'text-green-600' : n.impact === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                  {n.impact === 'positive' ? '▲ Bullish' : n.impact === 'negative' ? '▼ Bearish' : '→ Neutral'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlobalMarketIntelligence;
