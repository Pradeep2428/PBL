import React from 'react';
import Sidebar from '../../components/Sidebar';
import { FileText, Upload, CheckCircle } from 'lucide-react';

const docs = [
  { id: 1, order: 'ORD-2024-001', buyer: 'Al Rashid Trading', product: 'Cumin Whole 50MT', type: 'Bill of Lading', status: 'issued', date: '2024-08-18' },
  { id: 2, order: 'ORD-2024-001', buyer: 'Al Rashid Trading', product: 'Cumin Whole 50MT', type: 'Certificate of Origin', status: 'issued', date: '2024-08-18' },
  { id: 3, order: 'ORD-2024-001', buyer: 'Al Rashid Trading', product: 'Cumin Whole 50MT', type: 'Phytosanitary Certificate', status: 'issued', date: '2024-08-17' },
  { id: 4, order: 'ORD-2024-002', buyer: 'Gewürze GmbH', product: 'Black Pepper 20MT', type: 'Proforma Invoice', status: 'draft', date: '2024-08-20' },
  { id: 5, order: 'ORD-2024-002', buyer: 'Gewürze GmbH', product: 'Black Pepper 20MT', type: 'Bill of Lading', status: 'pending', date: '–' },
];

const statusColors = { issued: 'badge-green', draft: 'badge-yellow', pending: 'badge-red' };

const DocumentManagement = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-500 mt-1">Manage export documentation for all orders</p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2"><Upload className="h-4 w-4" /> Upload Document</button>
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-gray-500 font-medium pb-3">Order</th>
                <th className="text-left text-gray-500 font-medium pb-3">Buyer</th>
                <th className="text-left text-gray-500 font-medium pb-3">Product</th>
                <th className="text-left text-gray-500 font-medium pb-3">Document Type</th>
                <th className="text-left text-gray-500 font-medium pb-3">Date</th>
                <th className="text-left text-gray-500 font-medium pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {docs.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-gray-700">{d.order}</td>
                  <td className="py-3 text-gray-600">{d.buyer}</td>
                  <td className="py-3 text-gray-600 text-xs">{d.product}</td>
                  <td className="py-3 font-medium text-gray-800 flex items-center gap-2"><FileText className="h-4 w-4 text-gray-400" />{d.type}</td>
                  <td className="py-3 text-gray-500">{d.date}</td>
                  <td className="py-3"><span className={statusColors[d.status] || 'badge-blue'}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
);

export default DocumentManagement;
