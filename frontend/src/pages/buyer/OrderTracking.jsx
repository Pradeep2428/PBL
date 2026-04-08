import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Truck, Package, CheckCircle, Clock, MapPin, X } from 'lucide-react';

const DEMO_ORDERS = [
  { _id: '1', product: { name: 'Cumin Whole (Jeera)' }, quantity: 50, unit: 'MT', price: 2820, totalValue: 141000, status: 'shipped', createdAt: '2024-08-15',
    shipment: { containerNo: 'MSCU1234567', vessel: 'MSC Beatrice', origin: 'Mundra Port, India', destination: 'Jebel Ali, Dubai', estimatedArrival: '2024-09-10', status: 'in-transit',
      updates: [
        { status: 'placed', description: 'Order confirmed and payment received', timestamp: '2024-08-10', location: 'AgriExport HQ' },
        { status: 'processing', description: 'Quality inspection and packing in progress', timestamp: '2024-08-12', location: 'Warehouse, Unjha' },
        { status: 'loading', description: 'Container stuffed and sealed (MSCU1234567)', timestamp: '2024-08-15', location: 'Mundra Port, India' },
        { status: 'in-transit', description: 'Vessel departed Mundra Port', timestamp: '2024-08-18', location: 'Mundra Port → Arabian Sea' },
      ]
    }
  },
  { _id: '2', product: { name: 'Turmeric Finger' }, quantity: 25, unit: 'MT', price: 2050, totalValue: 51250, status: 'processing', createdAt: '2024-08-20', shipment: null },
];

const statusSteps = ['placed', 'processing', 'shipped', 'delivered'];
const statusLabels = { placed: 'Order Placed', processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered' };
const statusColors = { placed: 'bg-gray-400', processing: 'bg-blue-400', shipped: 'bg-orange-400', 'in-transit': 'bg-orange-400', delivered: 'bg-green-500', cancelled: 'bg-red-400' };

const OrderTracking = () => {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/api/buyers/orders').then(r => setOrders(r.data)).catch(() => {});
  }, []);

  const getStepIndex = (status) => statusSteps.indexOf(status === 'shipped' || status === 'in-transit' ? 'shipped' : status);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
          <p className="text-gray-500 mt-1">Track all your orders and shipments in real-time</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o._id} onClick={() => setSelected(o)}
                className={`card cursor-pointer hover:shadow-lg transition-all border-2 ${selected?._id === o._id ? 'border-green-500' : 'border-transparent'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{o.product?.name}</h3>
                    <p className="text-sm text-gray-400">{o.quantity} {o.unit} · {new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${statusColors[o.status] || 'bg-gray-400'}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold">${o.totalValue?.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Click to track</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-1">
                    {statusSteps.map((s, i) => {
                      const currentIdx = getStepIndex(o.status);
                      const done = i <= currentIdx;
                      return (
                        <React.Fragment key={s}>
                          <div className={`h-2 w-2 rounded-full flex-shrink-0 ${done ? 'bg-green-500' : 'bg-gray-200'}`} />
                          {i < statusSteps.length - 1 && <div className={`h-0.5 flex-1 ${i < currentIdx ? 'bg-green-500' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    {statusSteps.map(s => <span key={s} className="text-xs text-gray-400">{statusLabels[s]}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            {selected ? (
              <div className="card sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Shipment Details</h2>
                  <button onClick={() => setSelected(null)}><X className="h-4 w-4 text-gray-400" /></button>
                </div>
                {selected.shipment ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Container No.</div>
                        <div className="font-medium">{selected.shipment.containerNo}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Vessel</div>
                        <div className="font-medium">{selected.shipment.vessel}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Origin</div>
                        <div className="font-medium text-xs">{selected.shipment.origin}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500 text-xs mb-1">Est. Arrival</div>
                        <div className="font-medium">{new Date(selected.shipment.estimatedArrival).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-3">Tracking Timeline</h3>
                    <div className="space-y-3">
                      {selected.shipment.updates?.map((u, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${i === 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                            {i < selected.shipment.updates.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
                          </div>
                          <div className="pb-3">
                            <div className="font-medium text-gray-800 text-sm">{u.description}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              <MapPin className="h-3 w-3" /> {u.location} · {new Date(u.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p>Shipment tracking not yet available</p>
                    <p className="text-sm mt-1">We'll notify you when your order ships</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="card flex items-center justify-center py-16 text-gray-400">
                <div className="text-center">
                  <Truck className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Select an order to view tracking details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
