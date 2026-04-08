import React from 'react';
import Sidebar from '../../components/Sidebar';
import { FileText, Download, CheckCircle } from 'lucide-react';

const docs = [
  { id: 1, name: 'Bill of Lading – BL-2024-001', type: 'Bill of Lading', order: 'Cumin Whole 50MT', date: '2024-08-18', status: 'ready' },
  { id: 2, name: 'Certificate of Origin – COO-2024-001', type: 'Certificate of Origin', order: 'Cumin Whole 50MT', date: '2024-08-18', status: 'ready' },
  { id: 3, name: 'Phytosanitary Certificate – PHY-2024-001', type: 'Phytosanitary', order: 'Cumin Whole 50MT', date: '2024-08-17', status: 'ready' },
  { id: 4, name: 'Proforma Invoice – PI-2024-002', type: 'Invoice', order: 'Turmeric Finger 25MT', date: '2024-08-21', status: 'ready' },
  { id: 5, name: 'Quality Analysis Report – QA-2024-001', type: 'QA Report', order: 'Cumin Whole 50MT', date: '2024-08-16', status: 'ready' },
  { id: 6, name: 'Fumigation Certificate – FUM-2024-001', type: 'Fumigation', order: 'Cumin Whole 50MT', date: '2024-08-17', status: 'pending' },
];

const typeColors = { 'Bill of Lading': 'bg-blue-50 text-blue-700', 'Certificate of Origin': 'bg-green-50 text-green-700', Phytosanitary: 'bg-purple-50 text-purple-700', Invoice: 'bg-yellow-50 text-yellow-700', 'QA Report': 'bg-orange-50 text-orange-700', Fumigation: 'bg-red-50 text-red-700' };

const Documents = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Export Documents</h1>
        <p className="text-gray-500 mt-1">All trade documents for your orders</p>
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-gray-500 font-medium pb-3">Document</th>
                <th className="text-left text-gray-500 font-medium pb-3">Type</th>
                <th className="text-left text-gray-500 font-medium pb-3">Order</th>
                <th className="text-left text-gray-500 font-medium pb-3">Date</th>
                <th className="text-left text-gray-500 font-medium pb-3">Status</th>
                <th className="text-left text-gray-500 font-medium pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {docs.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" /> {d.name}
                  </td>
                  <td className="py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[d.type] || 'bg-gray-50 text-gray-600'}`}>{d.type}</span></td>
                  <td className="py-3 text-gray-500">{d.order}</td>
                  <td className="py-3 text-gray-500">{d.date}</td>
                  <td className="py-3">
                    {d.status === 'ready' ? <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle className="h-3.5 w-3.5" /> Ready</span> : <span className="text-yellow-600 text-xs">Pending</span>}
                  </td>
                  <td className="py-3">
                    {d.status === 'ready' && (
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs font-medium">
                        <Download className="h-3.5 w-3.5" /> Download
                      </button>
                    )}
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

export default Documents;
