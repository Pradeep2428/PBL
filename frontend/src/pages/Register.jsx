import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf } from 'lucide-react';

const roles = [
  { value: 'buyer', label: 'Buyer', desc: 'Import Indian agri-products', icon: '🌍' },
  { value: 'farmer', label: 'Farmer/Supplier', desc: 'Export my farm produce', icon: '🌾' },
  { value: 'admin', label: 'Admin', desc: 'Platform operations', icon: '⚙️' },
  { value: 'superadmin', label: 'Super Admin', desc: 'Full platform access', icon: '👑' },
];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: searchParams.get('role') || 'buyer',
    companyName: '', phone: '', country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const user = await register(form);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-green-600 p-2 rounded-xl"><Leaf className="h-6 w-6 text-white" /></div>
            <span className="text-xl font-bold text-gray-900">AgriExport<span className="text-green-600">India</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1">Join India's premier agri-export platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(r => (
                  <button key={r.value} type="button" onClick={() => setForm({...form, role: r.value})}
                    className={`border-2 rounded-xl p-3 text-left transition-all ${form.role === r.value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="text-lg mb-1">{r.icon}</div>
                    <div className="text-sm font-semibold text-gray-900">{r.label}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company / Farm</label>
                <input type="text" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Company name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="you@company.com" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="India / UAE / USA" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Min. 6 characters" />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-base disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
