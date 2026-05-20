import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import { Sidebar } from '../components/common/Sidebar';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Asistencia', icon: <EventNoteIcon />, path: '/asistencia' },
  { text: 'Solicitudes', icon: <AssignmentIcon />, path: '/solicitudes' },
  { text: 'Empleados', icon: <PeopleIcon />, path: '/empleados' },
  { text: 'Horarios', icon: <ScheduleIcon />, path: '/horarios' },
  { text: 'Configuración',icon: <SettingsIcon />, path: '/configuracion' },
    

];

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const isMobile = useMediaQuery('(max-width:899px)');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setCollapsed(!collapsed);
  };

  // Clase condicional para el layout principal
  const layoutClass = `admin-layout ${collapsed ? 'sidebar-collapsed' : ''}`;

  return (
    <div className={layoutClass}>
      <Sidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
        onLogout={onLogout}
        menuItems={menuItems}
        title="ADMINISTRADOR"
      />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};