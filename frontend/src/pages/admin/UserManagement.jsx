import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Users, CheckCircle, XCircle, Search } from 'lucide-react';

const DEMO_USERS = [
  { _id: '1', name: 'Ahmed Al Rashid', email: 'ahmed@alrashid.ae', role: 'buyer', companyName: 'Al Rashid Trading LLC', country: 'UAE', isApproved: true, kycVerified: true, trustScore: 88, createdAt: '2024-07-10' },
  { _id: '2', name: 'James Wilson', email: 'james@spicepro.com', role: 'buyer', companyName: 'SpicePro USA', country: 'USA', isApproved: false, kycVerified: false, trustScore: 0, createdAt: '2024-08-18' },
  { _id: '3', name: 'Ramesh Patel', email: 'ramesh@patelagro.in', role: 'farmer', companyName: 'Patel Agro Farms', country: 'India', isApproved: true, kycVerified: true, trustScore: 92, createdAt: '2024-06-01' },
  { _id: '4', name: 'Suresh Kumar', email: 'suresh@farm.in', role: 'farmer', companyName: 'Kumar Farms', country: 'India', isApproved: false, kycVerified: false, trustScore: 0, createdAt: '2024-08-20' },
  { _id: '5', name: 'Maria Schmidt', email: 'maria@gewuerze.de', role: 'buyer', companyName: 'Gewürze GmbH', country: 'Germany', isApproved: true, kycVerified: true, trustScore: 78, createdAt: '2024-07-25' },
];

const roleColors = { buyer: 'badge-blue', farmer: 'badge-green', admin: 'bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium', superadmin: 'bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium' };

const UserManagement = () => {
  const [users, setUsers] = useState(DEMO_USERS);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/api/admin/users').then(r => setUsers(r.data)).catch(() => {});
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/admin/users/${id}/approve`);
    } catch {}
    setUsers(users.map(u => u._id === id ? { ...u, isApproved: true, kycVerified: true } : u));
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/api/admin/users/${id}/reject`);
    } catch {}
    setUsers(users.map(u => u._id === id ? { ...u, isApproved: false } : u));
  };

  const filtered = users.filter(u =>
    (tab === 'all' || (tab === 'pending' && !u.isApproved && ['buyer','farmer'].includes(u.role))) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || !search)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Approve, manage and monitor platform users</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-2">
              {['all', 'pending'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t} {t === 'pending' && <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-1.5">{users.filter(u => !u.isApproved && ['buyer','farmer'].includes(u.role)).length}</span>}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-3">User</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Role</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Company</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Country</th>
                  <th className="text-left text-gray-500 font-medium pb-3">KYC</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Status</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="py-3">
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-xs text-gray-400">{u.email}</div>
                    </td>
                    <td className="py-3"><span className={roleColors[u.role] || 'badge-blue'}>{u.role}</span></td>
                    <td className="py-3 text-gray-600">{u.companyName || '–'}</td>
                    <td className="py-3 text-gray-600">{u.country || '–'}</td>
                    <td className="py-3">
                      {u.kycVerified ? <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Verified</span> : <span className="text-gray-400 text-xs">Pending</span>}
                    </td>
                    <td className="py-3">
                      {u.isApproved ? <span className="badge-green">Approved</span> : <span className="badge-yellow">Pending</span>}
                    </td>
                    <td className="py-3">
                      {!u.isApproved && ['buyer','farmer'].includes(u.role) ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleApprove(u._id)} className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium">
                            <CheckCircle className="h-3.5 w-3.5" /> Approve
                          </button>
                          <button onClick={() => handleReject(u._id)} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium">
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </div>
                      ) : u.isApproved ? (
                        <button onClick={() => handleReject(u._id)} className="text-xs text-gray-400 hover:text-red-500 font-medium">Revoke</button>
                      ) : null}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="7" className="py-8 text-center text-gray-400">No users found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
