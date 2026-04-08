import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import BuyerDashboard from './pages/buyer/BuyerDashboard';
import ProductBrowse from './pages/buyer/ProductBrowse';
import RFQForm from './pages/buyer/RFQForm';
import OrderTracking from './pages/buyer/OrderTracking';
import BuyerDocuments from './pages/buyer/Documents';

import FarmerDashboard from './pages/farmer/FarmerDashboard';
import CropListing from './pages/farmer/CropListing';
import MarketIntelligence from './pages/farmer/MarketIntelligence';
import AIAdvisory from './pages/farmer/AIAdvisory';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RFQManagement from './pages/admin/RFQManagement';
import LogisticsManagement from './pages/admin/LogisticsManagement';
import DocumentManagement from './pages/admin/DocumentManagement';

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import Analytics from './pages/superadmin/Analytics';
import SupplierPerformance from './pages/superadmin/SupplierPerformance';
import BuyerReliability from './pages/superadmin/BuyerReliability';

import GlobalMarketIntelligence from './pages/market/GlobalMarketIntelligence';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Buyer Routes */}
          <Route path="/buyer" element={<ProtectedRoute roles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/buyer/products" element={<ProtectedRoute roles={['buyer']}><ProductBrowse /></ProtectedRoute>} />
          <Route path="/buyer/rfq" element={<ProtectedRoute roles={['buyer']}><RFQForm /></ProtectedRoute>} />
          <Route path="/buyer/orders" element={<ProtectedRoute roles={['buyer']}><OrderTracking /></ProtectedRoute>} />
          <Route path="/buyer/documents" element={<ProtectedRoute roles={['buyer']}><BuyerDocuments /></ProtectedRoute>} />

          {/* Farmer Routes */}
          <Route path="/farmer" element={<ProtectedRoute roles={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/farmer/crops" element={<ProtectedRoute roles={['farmer']}><CropListing /></ProtectedRoute>} />
          <Route path="/farmer/market" element={<ProtectedRoute roles={['farmer']}><MarketIntelligence /></ProtectedRoute>} />
          <Route path="/farmer/advisory" element={<ProtectedRoute roles={['farmer']}><AIAdvisory /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute roles={['admin', 'superadmin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={['admin', 'superadmin']}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/rfqs" element={<ProtectedRoute roles={['admin', 'superadmin']}><RFQManagement /></ProtectedRoute>} />
          <Route path="/admin/logistics" element={<ProtectedRoute roles={['admin', 'superadmin']}><LogisticsManagement /></ProtectedRoute>} />
          <Route path="/admin/documents" element={<ProtectedRoute roles={['admin', 'superadmin']}><DocumentManagement /></ProtectedRoute>} />

          {/* Super Admin Routes */}
          <Route path="/superadmin" element={<ProtectedRoute roles={['superadmin']}><SuperAdminDashboard /></ProtectedRoute>} />
          <Route path="/superadmin/analytics" element={<ProtectedRoute roles={['superadmin']}><Analytics /></ProtectedRoute>} />
          <Route path="/superadmin/suppliers" element={<ProtectedRoute roles={['superadmin']}><SupplierPerformance /></ProtectedRoute>} />
          <Route path="/superadmin/buyers" element={<ProtectedRoute roles={['superadmin']}><BuyerReliability /></ProtectedRoute>} />

          {/* Market */}
          <Route path="/market" element={<ProtectedRoute roles={['buyer','farmer','admin','superadmin']}><GlobalMarketIntelligence /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
