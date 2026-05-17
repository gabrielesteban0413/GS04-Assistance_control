import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  return (
    <div className="layout-admin">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/asistencia">Asistencia</NavLink>
          <NavLink to="/solicitudes">Solicitudes</NavLink>
          <NavLink to="/empleados">Empleados</NavLink>
          <NavLink to="/horarios">Horarios</NavLink>
          <NavLink to="/configuracion">Configuración</NavLink>
        </nav>
        <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};