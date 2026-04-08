import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Truck, MapPin, X } from 'lucide-react';

const DEMO_SHIPMENTS = [
  { _id: '1', containerNo: 'MSCU1234567', vessel: 'MSC Beatrice', origin: 'Mundra Port, India', destination: 'Jebel Ali, Dubai', status: 'in-transit', estimatedArrival: '2024-09-10', order: { buyer: { name: 'Ahmed Al Rashid', companyName: 'Al Rashid Trading' }, product: { name: 'Cumin Whole 50MT' } } },
  { _id: '2', containerNo: 'OOLU9876543', vessel: 'OOCL Hong Kong', origin: 'Nhava Sheva, India', destination: 'Rotterdam, Netherlands', status: 'customs', estimatedArrival: '2024-09-25', order: { buyer: { name: 'Maria Schmidt', companyName: 'Gewürze GmbH' }, product: { name: 'Black Pepper 20MT' } } },
];

const statusColors = { loading: 'badge-yellow', 'in-transit': 'badge-blue', customs: 'bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium', delivered: 'badge-green' };
const statusOptions = ['loading', 'in-transit', 'customs', 'delivered'];

const LogisticsManagement = () => {
  const [shipments, setShipments] = useState(DEMO_SHIPMENTS);
  const [updateModal, setUpdateModal] = useState(null);
  const [updateForm, setUpdateForm] = useState({ status: '', location: '', description: '' });

  useEffect(() => {
    api.get('/api/admin/shipments').then(r => setShipments(r.data)).catch(() => {});
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/shipments/${updateModal._id}/update`, updateForm);
    } catch {}
    setShipments(shipments.map(s => s._id === updateModal._id ? { ...s, status: updateForm.status } : s));
    setUpdateModal(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Logistics Management</h1>
          <p className="text-gray-500 mt-1">Track and update shipment status for all active orders</p>
        </div>

        <div className="space-y-4">
          {shipments.map(s => (
            <div key={s._id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Truck className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-gray-900">{s.containerNo}</h3>
                    <span className={statusColors[s.status] || 'badge-blue'}>{s.status}</span>
                  </div>
                  <p className="text-sm text-gray-500">{s.order?.buyer?.companyName || s.order?.buyer?.name} · {s.order?.product?.name}</p>
                </div>
                <button onClick={() => { setUpdateModal(s); setUpdateForm({ status: s.status, location: '', description: '' }); }}
                  className="btn-primary text-sm">Update Status</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><div className="text-gray-400 text-xs mb-1">Vessel</div><div className="font-medium text-gray-700">{s.vessel}</div></div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Origin</div>
                  <div className="flex items-center gap-1 text-gray-700"><MapPin className="h-3 w-3" />{s.origin}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Destination</div>
                  <div className="flex items-center gap-1 text-gray-700"><MapPin className="h-3 w-3" />{s.destination}</div>
                </div>
                <div><div className="text-gray-400 text-xs mb-1">Est. Arrival</div><div className="font-medium text-gray-700">{s.estimatedArrival ? new Date(s.estimatedArrival).toLocaleDateString() : '–'}</div></div>
              </div>
            </div>
          ))}
          {shipments.length === 0 && (
            <div className="card text-center py-12 text-gray-400">
              <Truck className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No active shipments</p>
            </div>
          )}
        </div>

        {updateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Update Shipment – {updateModal.containerNo}</h3>
                <button onClick={() => setUpdateModal(null)}><X className="h-5 w-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                  <select required value={updateForm.status} onChange={e => setUpdateForm({...updateForm, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                  <input type="text" value={updateForm.location} onChange={e => setUpdateForm({...updateForm, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="e.g. Arabian Sea, Gulf of Oman" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Update Description</label>
                  <textarea rows={2} value={updateForm.description} onChange={e => setUpdateForm({...updateForm, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                    placeholder="What happened..." />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn-primary text-sm">Update</button>
                  <button type="button" onClick={() => setUpdateModal(null)} className="flex-1 btn-secondary text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LogisticsManagement;
