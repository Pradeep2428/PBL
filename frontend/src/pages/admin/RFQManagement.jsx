import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { FileText, MessageSquare, X } from 'lucide-react';

const DEMO_RFQS = [
  { _id: '1', buyer: { name: 'Ahmed Al Rashid', companyName: 'Al Rashid Trading' }, product: { name: 'Cumin Whole (Jeera)', price: 2850 }, quantity: 50, unit: 'MT', targetPrice: 2700, status: 'pending', createdAt: '2024-08-20', message: 'Need FAQ grade, HACCP certified' },
  { _id: '2', buyer: { name: 'James Wilson', companyName: 'SpicePro USA' }, product: { name: 'Turmeric Finger', price: 2100 }, quantity: 100, unit: 'MT', targetPrice: 2000, status: 'quoted', quotedPrice: 2050, createdAt: '2024-08-18', message: 'Organic certified preferred' },
  { _id: '3', buyer: { name: 'Maria Schmidt', companyName: 'Gewürze GmbH' }, product: { name: 'Black Pepper 500GL', price: 6200 }, quantity: 20, unit: 'MT', targetPrice: 6000, status: 'accepted', quotedPrice: 6100, createdAt: '2024-08-15' },
];

const statusBadge = (s) => ({ pending: 'badge-yellow', quoted: 'badge-blue', accepted: 'badge-green', rejected: 'badge-red' }[s] || 'badge-blue');

const RFQManagement = () => {
  const [rfqs, setRFQs] = useState(DEMO_RFQS);
  const [quoteModal, setQuoteModal] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ quotedPrice: '', adminNotes: '' });

  useEffect(() => {
    api.get('/api/admin/rfqs').then(r => setRFQs(r.data)).catch(() => {});
  }, []);

  const handleQuote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/admin/rfqs/${quoteModal._id}/quote`, { ...quoteForm, status: 'quoted' });
      setRFQs(rfqs.map(r => r._id === quoteModal._id ? { ...r, ...res.data, status: 'quoted', quotedPrice: Number(quoteForm.quotedPrice) } : r));
    } catch {
      setRFQs(rfqs.map(r => r._id === quoteModal._id ? { ...r, status: 'quoted', quotedPrice: Number(quoteForm.quotedPrice), adminNotes: quoteForm.adminNotes } : r));
    }
    setQuoteModal(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">RFQ Management</h1>
          <p className="text-gray-500 mt-1">Review and respond to buyer quote requests</p>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-3">Buyer</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Product</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Quantity</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Target Price</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Quoted</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Date</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Status</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rfqs.map(r => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="py-3">
                      <div className="font-medium text-gray-900 text-xs">{r.buyer?.companyName || r.buyer?.name}</div>
                      <div className="text-xs text-gray-400">{r.buyer?.name}</div>
                    </td>
                    <td className="py-3 font-medium text-gray-700 text-xs">{r.product?.name}</td>
                    <td className="py-3 text-xs text-gray-600">{r.quantity} {r.unit}</td>
                    <td className="py-3 text-xs text-gray-600">{r.targetPrice ? `$${r.targetPrice}` : '–'}</td>
                    <td className="py-3 text-xs">{r.quotedPrice ? <span className="text-green-600 font-bold">${r.quotedPrice}</span> : '–'}</td>
                    <td className="py-3 text-xs text-gray-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '–'}</td>
                    <td className="py-3"><span className={statusBadge(r.status)}>{r.status}</span></td>
                    <td className="py-3">
                      {r.status === 'pending' && (
                        <button onClick={() => { setQuoteModal(r); setQuoteForm({ quotedPrice: r.product?.price || '', adminNotes: '' }); }}
                          className="flex items-center gap-1 text-xs text-green-600 font-medium hover:text-green-700">
                          <MessageSquare className="h-3.5 w-3.5" /> Send Quote
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {quoteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Send Quote</h3>
                <button onClick={() => setQuoteModal(null)}><X className="h-5 w-5 text-gray-400" /></button>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm">
                <div><span className="text-gray-500">Product:</span> <strong>{quoteModal.product?.name}</strong></div>
                <div><span className="text-gray-500">Buyer:</span> <strong>{quoteModal.buyer?.companyName}</strong></div>
                <div><span className="text-gray-500">Quantity:</span> <strong>{quoteModal.quantity} {quoteModal.unit}</strong></div>
                {quoteModal.message && <div className="mt-1 text-gray-500 italic">"{quoteModal.message}"</div>}
              </div>
              <form onSubmit={handleQuote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quoted Price (USD/MT) *</label>
                  <input type="number" required value={quoteForm.quotedPrice} onChange={e => setQuoteForm({...quoteForm, quotedPrice: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes to Buyer</label>
                  <textarea rows={3} value={quoteForm.adminNotes} onChange={e => setQuoteForm({...quoteForm, adminNotes: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                    placeholder="Payment terms, delivery schedule..." />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn-primary text-sm">Send Quote</button>
                  <button type="button" onClick={() => setQuoteModal(null)} className="flex-1 btn-secondary text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RFQManagement;
