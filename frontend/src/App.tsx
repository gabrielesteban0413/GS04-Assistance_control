import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/auth/Login.page';

// Layouts temporales si no existen
const AdminLayout = () => <div>Admin Layout</div>;
const EmployeeLayout = () => <div>Employee Layout</div>;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/employee/*" element={<EmployeeLayout />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;