import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PartnerProtectedRoute = () => {
  const token = localStorage.getItem('adminToken');
  const userStr = localStorage.getItem('adminUser');
  let user = null;
  
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch(e) {}
  }

  if (!token || !user || user.role !== 'partner') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PartnerProtectedRoute;
