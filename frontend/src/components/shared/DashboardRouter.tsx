import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
  if (user.role === 'rrhh') return <Navigate to="/rrhh/dashboard" />;
  return <Navigate to="/employee/dashboard" />;
};

export default DashboardRouter;