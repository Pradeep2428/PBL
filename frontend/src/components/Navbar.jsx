import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Menu, X, Bell, ChevronDown, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardPath = user ? `/${user.role}` : '/login';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">AgriExport<span className="text-green-600">India</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</Link>
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Get Started</Link>
              </>
            ) : (
              <>
                <Link to={dashboardPath} className="text-gray-600 hover:text-green-600 font-medium transition-colors">Dashboard</Link>
                <button className="relative text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </button>
                <div className="relative">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors">
                    <div className="bg-green-600 text-white rounded-full h-7 w-7 flex items-center justify-center text-sm font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-green-600 capitalize">{user.role}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <Link to={dashboardPath} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                        <User className="h-4 w-4" /> Dashboard
                      </Link>
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link to="/" className="block text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
          {!user ? (
            <>
              <Link to="/login" className="block text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="block btn-primary text-center text-sm" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </>
          ) : (
            <>
              <Link to={dashboardPath} className="block text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="block text-red-600 font-medium w-full text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
