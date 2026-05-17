import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

interface EmployeeLayoutProps {
  onLogout: () => void;
}

export const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ onLogout }) => {
  return (
    <div className="layout-employee">
      <header className="employee-header">
        <h1>Sistema de Asistencia</h1>
        <nav>
          <NavLink to="/">Mi Dashboard</NavLink>
          <NavLink to="/asistencia">Registrar Asistencia</NavLink>
          <NavLink to="/solicitudes">Mis Solicitudes</NavLink>
        </nav>
        <button onClick={onLogout}>Salir</button>
      </header>
      <main className="employee-content">
        <Outlet />
      </main>
    </div>
  );
};