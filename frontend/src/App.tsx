import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AdminLayout } from './layouts/AdminLayout';
// Importa el dashboard real
import DashboardPage from './pages/admin/Dashboard.page';

const theme = createTheme({ palette: { primary: { main: '#1976d2' } } });
const mockLogout = () => console.log('Cerrar sesión');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout onLogout={mockLogout} />}>
            {/* Cambia TestDashboard por DashboardPage */}
            <Route index element={<DashboardPage />} />
            <Route path="asistencia" element={<div>Asistencia</div>} />
            <Route path="solicitudes" element={<div>Solicitudes</div>} />
            <Route path="empleados" element={<div>Empleados</div>} />
            <Route path="horarios" element={<div>Horarios</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;