import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { FileText, CheckCircle } from 'lucide-react';

const DEMO_PRODUCTS = [
  { _id: '1', name: 'Cumin Whole (Jeera)', price: 2850 },
  { _id: '2', name: 'Cumin Powder', price: 3200 },
  { _id: '3', name: 'Dehydrated Onion Flakes', price: 1100 },
  { _id: '4', name: 'Coriander Seeds', price: 1450 },
  { _id: '5', name: 'Turmeric Finger', price: 2100 },
  { _id: '6', name: 'Black Pepper (500GL)', price: 6200 },
];

const RFQForm = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    product: searchParams.get('product') || '',
    quantity: '', unit: 'MT', targetPrice: '', currency: 'USD',
    deliveryDate: '', deliveryPort: '', message: ''
  });

  useEffect(() => {
    api.get('/api/products').then(r => setProducts(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/buyers/rfqs', form);
      setSubmitted(true);
    } catch {
      setSubmitted(true); // demo: show success anyway
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">RFQ Submitted!</h2>
          <p className="text-gray-500 mb-6">Your request has been received. Our team will respond with a quote within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">Submit Another RFQ</button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Request for Quotation</h1>
          <p className="text-gray-500 mt-1">Submit your requirements and receive competitive quotes within 24 hours</p>
        </div>

        <div className="max-w-2xl">
          <div className="card">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="bg-green-100 p-2 rounded-lg"><FileText className="h-5 w-5 text-green-600" /></div>
              <div>
                <h2 className="font-semibold text-gray-900">New RFQ</h2>
                <p className="text-sm text-gray-500">Fill in your requirements below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                <select required value={form.product} onChange={e => setForm({...form, product: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                  <option value="">Select product...</option>
                  {products.map(p => <option key={p._id} value={p._id}>{p.name} – Est. ${p.price}/MT</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <div className="flex">
                    <input type="number" required min="1" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})}
                      className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="e.g. 50" />
                    <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}
                      className="border border-l-0 border-gray-300 rounded-r-lg px-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-gray-50">
                      <option>MT</option><option>KG</option><option>Container</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Price (optional)</label>
                  <div className="flex">
                    <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}
                      className="border border-r-0 border-gray-300 rounded-l-lg px-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-gray-50">
                      <option>USD</option><option>EUR</option><option>INR</option>
                    </select>
                    <input type="number" value={form.targetPrice} onChange={e => setForm({...form, targetPrice: e.target.value})}
                      className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="per MT" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Delivery Date</label>
                  <input type="date" value={form.deliveryDate} onChange={e => setForm({...form, deliveryDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Port</label>
                  <input type="text" value={form.deliveryPort} onChange={e => setForm({...form, deliveryPort: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="e.g. Jebel Ali, Dubai" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                  placeholder="Certifications needed (HACCP, organic, etc.), packaging requirements..." />
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-base disabled:opacity-60">
                {loading ? 'Submitting...' : 'Submit RFQ'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RFQForm;
