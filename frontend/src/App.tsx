import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import SignIn from './pages/auth/SignIn';
import ForgotPassword from './pages/auth/ForgotPassword';

// Componentes placeholder para testing (puedes reemplazar luego)
const AdminDashboard = () => <div>Admin Dashboard (test)</div>;
const RrhhDashboard = () => <div>RRHH Dashboard (test)</div>;
const EmployeeDashboard = () => <div>Employee Dashboard (test)</div>;

// Layouts simplificados para test
const AdminLayout = ({ onLogout }: { onLogout: () => void }) => (
  <div>
    <h1>Admin Layout</h1>
    <button onClick={onLogout}>Cerrar sesión</button>
    <AdminDashboard />
  </div>
);
const RrhhLayout = ({ onLogout }: { onLogout: () => void }) => (
  <div>
    <h1>RRHH Layout</h1>
    <button onClick={onLogout}>Cerrar sesión</button>
    <RrhhDashboard />
  </div>
);
const EmployeeLayout = ({ onLogout }: { onLogout: () => void }) => (
  <div>
    <h1>Employee Layout</h1>
    <button onClick={onLogout}>Cerrar sesión</button>
    <EmployeeDashboard />
  </div>
);

const theme = createTheme({ palette: { primary: { main: '#1976d2' } } });

const AppContent = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <SignIn />;

  const role = user?.role;
  if (!role) return <Navigate to="/login" />;

  if (role === 'admin') return <AdminLayout onLogout={logout} />;
  if (role === 'rrhh') return <RrhhLayout onLogout={logout} />;
  return <EmployeeLayout onLogout={logout} />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Ruta pública para recuperar contraseña */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* El resto de la aplicación requiere autenticación */}
          <Route
            path="*"
            element={
              <AuthProvider>
                <AppContent />
              </AuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;