import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, LogOut, LayoutDashboard, Package, FileText, Truck, Users, BarChart3, ShoppingCart, Sprout, TrendingUp, Brain, Globe, MessageSquare } from 'lucide-react';

const MENU = {
  buyer: [
    { to: '/buyer', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/buyer/products', label: 'Browse Products', icon: Package },
    { to: '/buyer/rfq', label: 'Request Quote', icon: FileText },
    { to: '/buyer/orders', label: 'Order Tracking', icon: Truck },
    { to: '/buyer/documents', label: 'Documents', icon: FileText },
  ],
  farmer: [
    { to: '/farmer', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/farmer/crops', label: 'My Crop Listings', icon: Sprout },
    { to: '/farmer/market', label: 'Market Intelligence', icon: TrendingUp },
    { to: '/farmer/advisory', label: 'AI Advisory', icon: Brain },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/rfqs', label: 'RFQ Management', icon: MessageSquare },
    { to: '/admin/logistics', label: 'Logistics', icon: Truck },
    { to: '/admin/documents', label: 'Documents', icon: FileText },
  ],
  superadmin: [
    { to: '/superadmin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/superadmin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/superadmin/suppliers', label: 'Supplier Performance', icon: ShoppingCart },
    { to: '/superadmin/buyers', label: 'Buyer Reliability', icon: Users },
    { to: '/market', label: 'Market Intelligence', icon: Globe },
  ],
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menu = user ? (MENU[user.role] || []) : [];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-1.5 rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">AgriExport India</div>
            <div className="text-xs text-green-400 capitalize">{user?.role} Portal</div>
          </div>
        </div>
      </div>

      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white rounded-full h-9 w-9 flex items-center justify-center font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs text-gray-400 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-700">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-900/40 hover:text-red-400 w-full transition-colors">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
