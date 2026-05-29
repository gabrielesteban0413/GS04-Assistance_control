import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/shared/PrivateRoute';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import { Toaster } from '@/components/ui/sonner';

/* LAYOUTS */

import { AdminLayout } from './layouts/AdminLayout';

import { RrhhLayout } from './layouts/RrhhLayout';

/* ADMIN */

import DashboardPage from './pages/admin/Dashboard.page';

import AsistenciaPage from './pages/admin/Asistencia.page';

import SolicitudesPage from './pages/admin/Solicitudes.page';

import EmpleadosPage from './pages/admin/Empleados.page';

import HorariosPage from './pages/admin/Horarios.page';

/* RRHH */

import RrhhDashboardPage from './pages/rrhh/Dashboard.page';

import RrhhEmpleadosPage from './pages/rrhh/Empleados.page';

import RegisterPage from './pages/rrhh/registerpage';

import ReportesPage from './pages/rrhh/Reportes.page';

import SolicitudesRrhhPage from './pages/rrhh/Solicitudes.page';

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

const mockLogout = () => console.log('Cerrar sesión');

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <BrowserRouter>
                <Routes>
                    {/* RUTAS PUBLICAS */}

                    <Route path="/login" element={<SignIn />} />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* RUTAS PROTEGIDAS */}

                    <Route element={<PrivateRoute />}>
                        {/* ADMIN */}

                        <Route
                            path="/"
                            element={<AdminLayout onLogout={mockLogout} />}
                        >
                            <Route index element={<DashboardPage />} />

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

                            <Route path="horarios" element={<HorariosPage />} />
                        </Route>

                        {/* RRHH */}

                        <Route
                            path="/rrhh"
                            element={<RrhhLayout onLogout={mockLogout} />}
                        >
                            <Route index element={<RrhhDashboardPage />} />

                            <Route
                                path="empleados"
                                element={<RrhhEmpleadosPage />}
                            />

                            <Route path="registro" element={<RegisterPage />} />

                            <Route path="reportes" element={<ReportesPage />} />

                            <Route
                                path="solicitudes"
                                element={<SolicitudesRrhhPage />}
                            />
                        </Route>
                    </Route>

                    {/* FALLBACK */}

                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </BrowserRouter>

            <Toaster richColors position="top-center" />
        </ThemeProvider>
    );
}

export default App;
