import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Star } from 'lucide-react';

const buyers = [
  { name: 'Ahmed Al Rashid', company: 'Al Rashid Trading LLC', country: '🇦🇪 UAE', paymentScore: 95, orderCompletion: 98, orders: 24, totalValue: 1250000, trustScore: 88 },
  { name: 'James Wilson', company: 'SpicePro USA', country: '🇺🇸 USA', paymentScore: 88, orderCompletion: 92, orders: 18, totalValue: 820000, trustScore: 82 },
  { name: 'Maria Schmidt', company: 'Gewürze GmbH', country: '🇩🇪 Germany', paymentScore: 97, orderCompletion: 96, orders: 31, totalValue: 1680000, trustScore: 94 },
  { name: 'Takeshi Yamamoto', company: 'Nippon Spice Co.', country: '🇯🇵 Japan', paymentScore: 99, orderCompletion: 100, orders: 12, totalValue: 490000, trustScore: 91 },
  { name: 'Abdullah Al Fahd', company: 'Saudi Agri Corp', country: '🇸🇦 Saudi Arabia', paymentScore: 82, orderCompletion: 87, orders: 9, totalValue: 380000, trustScore: 75 },
];

const BuyerReliability = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Reliability</h1>
        <p className="text-gray-500 mt-1">Payment and order completion scores for all buyers</p>
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-gray-500 font-medium pb-3">Buyer</th>
                <th className="text-left text-gray-500 font-medium pb-3">Country</th>
                <th className="text-center text-gray-500 font-medium pb-3">Payment Score</th>
                <th className="text-center text-gray-500 font-medium pb-3">Order Completion</th>
                <th className="text-right text-gray-500 font-medium pb-3">Orders</th>
                <th className="text-right text-gray-500 font-medium pb-3">Total Value</th>
                <th className="text-center text-gray-500 font-medium pb-3">Trust Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {buyers.map(b => (
                <tr key={b.name} className="hover:bg-gray-50">
                  <td className="py-3">
                    <div className="font-medium text-gray-900">{b.name}</div>
                    <div className="text-xs text-gray-400">{b.company}</div>
                  </td>
                  <td className="py-3 text-gray-600">{b.country}</td>
                  <td className="py-3 text-center">
                    <span className={`font-bold text-sm ${b.paymentScore >= 90 ? 'text-green-600' : b.paymentScore >= 80 ? 'text-yellow-600' : 'text-red-500'}`}>{b.paymentScore}%</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="font-bold text-sm text-green-600">{b.orderCompletion}%</span>
                  </td>
                  <td className="py-3 text-right font-medium text-gray-700">{b.orders}</td>
                  <td className="py-3 text-right font-medium text-green-600">${b.totalValue.toLocaleString()}</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-700">{b.trustScore}</span>
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

export default BuyerReliability;
