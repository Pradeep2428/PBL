import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoLogins = [
    { role: 'Buyer', email: 'buyer@demo.com', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { role: 'Farmer', email: 'farmer@demo.com', color: 'bg-green-50 border-green-200 text-green-700' },
    { role: 'Admin', email: 'admin@demo.com', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { role: 'SuperAdmin', email: 'superadmin@demo.com', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-green-600 p-2 rounded-xl"><Leaf className="h-6 w-6 text-white" /></div>
            <span className="text-xl font-bold text-gray-900">AgriExport<span className="text-green-600">India</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-base disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account? <Link to="/register" className="text-green-600 font-medium hover:underline">Register</Link>
          </p>
        </div>

        <div className="mt-4">
          <p className="text-center text-xs text-gray-400 mb-3">Demo Accounts (password: password123)</p>
          <div className="grid grid-cols-2 gap-2">
            {demoLogins.map(d => (
              <button key={d.role} onClick={() => setForm({ email: d.email, password: 'password123' })}
                className={`border rounded-lg px-3 py-2 text-xs font-medium transition-colors ${d.color}`}>
                {d.role}: {d.email.split('@')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
