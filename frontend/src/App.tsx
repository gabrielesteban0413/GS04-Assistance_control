import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import SignIn from './pages/auth/SignIn';  // tu componente de login
import { AdminLayout } from './layouts/AdminLayout';
import { RrhhLayout } from './layouts/RrhhLayout';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { AuthProvider } from './contexts/AuthContext';

// Páginas Admin

import AdminSolicitudesPage from './pages/admin/SolicitudesPage';


// Páginas RRHH
import RrhhDashboardPage from './pages/rrhh/DashboardPageRR';
import RrhhEmpleadosPage from './pages/rrhh/EmpleadosPage';
import RrhhSolicitudesPage from './pages/rrhh/SolicitudesPage';
import RrhhReportesPage from './pages/rrhh/ReportesPage';

// Páginas Empleado
import EmployeeDashboardPage from './pages/employee/DashboardPageEM';
import EmployeeAsistenciaPage from './pages/employee/AsistenciaPage';
import EmployeeSolicitudesPage from './pages/employee/SolicitudesPage';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return null; // o un spinner

  if (!isAuthenticated) {
    return <SignIn />; // tu componente de login ya maneja el éxito
  }

  const role = user?.role;

  // Admin
  if (role === 'admin') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout onLogout={logout} />}>

            <Route path="solicitudes" element={<AdminSolicitudesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  // RRHH
  if (role === 'rrhh') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RrhhLayout onLogout={logout} />}>
            <Route index element={<RrhhDashboardPage />} />
            <Route path="empleados" element={<RrhhEmpleadosPage />} />
            <Route path="solicitudes" element={<RrhhSolicitudesPage />} />
            <Route path="reportes" element={<RrhhReportesPage />} />
            <Route path="*" element={<RrhhDashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  // Employee
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLayout onLogout={logout} />}>
          <Route index element={<EmployeeDashboardPage />} />
          <Route path="asistencia" element={<EmployeeAsistenciaPage />} />
          <Route path="solicitudes" element={<EmployeeSolicitudesPage />} />
          <Route path="*" element={<EmployeeDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;