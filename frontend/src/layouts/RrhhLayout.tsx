import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

interface RrhhLayoutProps {
  onLogout: () => void;
}

export const RrhhLayout: React.FC<RrhhLayoutProps> = ({ onLogout }) => {
  return (
    <div className="layout-rrhh">
      <aside className="rrhh-sidebar">
        <h2>RRHH Panel</h2>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/empleados">Empleados</NavLink>
          <NavLink to="/solicitudes">Solicitudes</NavLink>
          <NavLink to="/reportes">Reportes</NavLink>
        </nav>
        <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
      </aside>
      <main className="rrhh-content">
        <Outlet />
      </main>
    </div>
  );
};
