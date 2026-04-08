import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Star } from 'lucide-react';

const suppliers = [
  { name: 'Patel Agro Farms', location: 'Unjha, Gujarat', commodity: 'Cumin', onTime: 96, quality: 98, orders: 47, revenue: 485000, trustScore: 92 },
  { name: 'Rajasthan Spices Ltd', location: 'Jodhpur, Rajasthan', commodity: 'Coriander', onTime: 88, quality: 92, orders: 32, revenue: 310000, trustScore: 85 },
  { name: 'Kerala Pepper House', location: 'Kozhikode, Kerala', commodity: 'Black Pepper', onTime: 94, quality: 96, orders: 28, revenue: 620000, trustScore: 90 },
  { name: 'Erode Turmeric Co.', location: 'Erode, Tamil Nadu', commodity: 'Turmeric', onTime: 91, quality: 95, orders: 38, revenue: 412000, trustScore: 88 },
  { name: 'Mahuva Dehydration', location: 'Mahuva, Gujarat', commodity: 'Dehydrated', onTime: 85, quality: 89, orders: 22, revenue: 198000, trustScore: 78 },
];

const SupplierPerformance = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Supplier Performance</h1>
        <p className="text-gray-500 mt-1">Performance ratings for all verified suppliers/farmers</p>
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-gray-500 font-medium pb-3">Supplier</th>
                <th className="text-left text-gray-500 font-medium pb-3">Commodity</th>
                <th className="text-center text-gray-500 font-medium pb-3">On-Time %</th>
                <th className="text-center text-gray-500 font-medium pb-3">Quality %</th>
                <th className="text-right text-gray-500 font-medium pb-3">Orders</th>
                <th className="text-right text-gray-500 font-medium pb-3">Revenue</th>
                <th className="text-center text-gray-500 font-medium pb-3">Trust Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {suppliers.map(s => (
                <tr key={s.name} className="hover:bg-gray-50">
                  <td className="py-3">
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-400">{s.location}</div>
                  </td>
                  <td className="py-3"><span className="badge-green">{s.commodity}</span></td>
                  <td className="py-3">
                    <div className="flex flex-col items-center">
                      <span className={`font-bold text-sm ${s.onTime >= 90 ? 'text-green-600' : s.onTime >= 80 ? 'text-yellow-600' : 'text-red-500'}`}>{s.onTime}%</span>
                      <div className="w-16 bg-gray-100 rounded-full h-1 mt-1"><div className={`h-1 rounded-full ${s.onTime >= 90 ? 'bg-green-500' : 'bg-yellow-400'}`} style={{ width: `${s.onTime}%` }} /></div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-sm text-green-600">{s.quality}%</span>
                      <div className="w-16 bg-gray-100 rounded-full h-1 mt-1"><div className="bg-green-500 h-1 rounded-full" style={{ width: `${s.quality}%` }} /></div>
                    </div>
                  </td>
                  <td className="py-3 text-right font-medium text-gray-700">{s.orders}</td>
                  <td className="py-3 text-right font-medium text-green-600">${s.revenue.toLocaleString()}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-700">{s.trustScore}</span>
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

export default SupplierPerformance;
