import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from '@/components/ui/sonner';
import { RrhhLayout } from './layouts/RrhhLayout';

// Páginas de RRHH
import RrhhDashboard from './pages/rrhh/Dashboard.page';
import RrhhEmpleados from './pages/rrhh/Empleados.page';
import RrhhSolicitudes from './pages/rrhh/Solicitudes.page';
import RrhhReportes from './pages/rrhh/Reportes.page';

const theme = createTheme({ palette: { primary: { main: '#1976d2' } } });
const mockLogout = () => console.log('Cerrar sesión');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RrhhLayout onLogout={mockLogout} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<RrhhDashboard />} />
            <Route path="empleados" element={<RrhhEmpleados />} />
            <Route path="solicitudes" element={<RrhhSolicitudes />} />
            <Route path="reportes" element={<RrhhReportes />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}

export default App;