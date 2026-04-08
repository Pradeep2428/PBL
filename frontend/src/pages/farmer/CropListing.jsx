import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Plus, CheckCircle } from 'lucide-react';

const statusColors = { available: 'badge-green', sold: 'badge-blue', expired: 'badge-red' };

const CropListing = () => {
  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cropType: '', quantity: '', unit: 'quintal', harvestDate: '', askingPrice: '', priceCurrency: 'INR', location: '', quality: 'A', sellIntent: true, notes: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/api/farmers/crops').then(r => setCrops(r.data)).catch(() => {
      setCrops([
        { _id: '1', cropType: 'Cumin', quantity: 500, unit: 'quintal', status: 'available', askingPrice: 18500, priceCurrency: 'INR', location: 'Unjha', quality: 'A', harvestDate: '2024-04-15' },
        { _id: '2', cropType: 'Coriander', quantity: 300, unit: 'quintal', status: 'available', askingPrice: 8800, priceCurrency: 'INR', location: 'Sanchor', quality: 'A', harvestDate: '2024-03-20' },
        { _id: '3', cropType: 'Fenugreek', quantity: 200, unit: 'quintal', status: 'available', askingPrice: 6200, priceCurrency: 'INR', location: 'Nagaur', quality: 'B', harvestDate: '2024-04-01' },
      ]);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/api/farmers/crops', form);
      setCrops([res.data, ...crops]);
    } catch {
      setCrops([{ _id: Date.now().toString(), ...form, status: 'available' }, ...crops]);
    } finally {
      setSubmitting(false);
      setShowForm(false);
      setForm({ cropType: '', quantity: '', unit: 'quintal', harvestDate: '', askingPrice: '', priceCurrency: 'INR', location: '', quality: 'A', sellIntent: true, notes: '' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Crop Listings</h1>
            <p className="text-gray-500 mt-1">Manage your crop inventory and connect with buyers</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="h-4 w-4" /> Add Crop Listing
          </button>
        </div>

        {showForm && (
          <div className="card mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Add New Crop Listing</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type *</label>
                <input type="text" required value={form.cropType} onChange={e => setForm({...form, cropType: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="e.g. Cumin, Coriander" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Village/District" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <div className="flex">
                  <input type="number" required min="1" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" placeholder="500" />
                  <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}
                    className="border border-l-0 border-gray-300 rounded-r-lg px-2 py-2.5 text-sm bg-gray-50">
                    <option>quintal</option><option>MT</option><option>KG</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asking Price</label>
                <div className="flex">
                  <select value={form.priceCurrency} onChange={e => setForm({...form, priceCurrency: e.target.value})}
                    className="border border-r-0 border-gray-300 rounded-l-lg px-2 py-2.5 text-sm bg-gray-50">
                    <option>INR</option><option>USD</option>
                  </select>
                  <input type="number" value={form.askingPrice} onChange={e => setForm({...form, askingPrice: e.target.value})}
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" placeholder="per quintal" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Date</label>
                <input type="date" value={form.harvestDate} onChange={e => setForm({...form, harvestDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quality Grade</label>
                <select value={form.quality} onChange={e => setForm({...form, quality: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                  <option value="A">Grade A (Export)</option><option value="B">Grade B</option><option value="C">Grade C</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                  placeholder="Additional details about quality, storage, etc." />
              </div>
              <div className="col-span-2 flex gap-3">
                <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-60">
                  {submitting ? 'Adding...' : 'Add Listing'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-3">Crop</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Quantity</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Asking Price</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Location</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Quality</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Harvest Date</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {crops.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{c.cropType}</td>
                    <td className="py-3 text-gray-600">{c.quantity} {c.unit}</td>
                    <td className="py-3 text-green-600 font-medium">{c.priceCurrency} {c.askingPrice?.toLocaleString()}</td>
                    <td className="py-3 text-gray-500">{c.location}</td>
                    <td className="py-3"><span className="badge-blue">Grade {c.quality}</span></td>
                    <td className="py-3 text-gray-500">{c.harvestDate ? new Date(c.harvestDate).toLocaleDateString() : '–'}</td>
                    <td className="py-3"><span className={statusColors[c.status] || 'badge-blue'}>{c.status}</span></td>
                  </tr>
                ))}
                {crops.length === 0 && <tr><td colSpan="7" className="py-8 text-center text-gray-400">No crop listings yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropListing;
