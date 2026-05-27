import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import { Toaster } from '@/components/ui/sonner';

/* LAYOUTS */

import { AdminLayout } from './layouts/AdminLayout';

import { EmployeeLayout } from './layouts/EmployeeLayout';

/* ADMIN */

import DashboardPage from './pages/admin/Dashboard.page';

import AsistenciaPage from './pages/admin/Asistencia.page';

import SolicitudesPage from './pages/admin/Solicitudes.page';

import EmpleadosPage from './pages/admin/Empleados.page';

import HorariosPage from './pages/admin/Horarios.page';

import ConfiguracionPage from './pages/admin/Configuracion.page';

/* EMPLOYEE */

import EmployeeDashboardPage from './pages/employee/Dashboard.page';

/* AUTH */

import SignIn from './pages/auth/SignIn';

import ForgotPassword from './pages/auth/ForgotPassword';

import ResetPassword from './pages/auth/ResetPassword';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const mockLogout = () =>
  console.log('Cerrar sesión');

function App() {

  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <BrowserRouter>

        <Routes>

          {/* PUBLICAS */}

          <Route
            path="/login"
            element={<SignIn />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          {/* ADMIN */}

          <Route
            path="/"
            element={
              <AdminLayout
                onLogout={mockLogout}
              />
            }
          >

            <Route
              index
              element={<DashboardPage />}
            />

            <Route
              path="asistencia"
              element={<AsistenciaPage />}
            />

            <Route
              path="solicitudes"
              element={<SolicitudesPage />}
            />

            <Route
              path="empleados"
              element={<EmpleadosPage />}
            />

            <Route
              path="horarios"
              element={<HorariosPage />}
            />

            <Route path="configuracion">

              <Route
                index
                element={
                  <Navigate
                    to="/configuracion/general"
                    replace
                  />
                }
              />

              <Route
                path="general"
                element={<ConfiguracionPage />}
              />

              <Route
                path="privacidad"
                element={<ConfiguracionPage />}
              />

              <Route
                path="seguridad"
                element={<ConfiguracionPage />}
              />

            </Route>

          </Route>

          {/* EMPLEADO */}

          <Route
            path="/employee"
            element={
              <EmployeeLayout
                onLogout={mockLogout}
              />
            }
          >

            <Route
              index
              element={<EmployeeDashboardPage />}
            />

          </Route>

        </Routes>

      </BrowserRouter>

      <Toaster
        richColors
        position="top-center"
      />

    </ThemeProvider>
  );
}

export default App;