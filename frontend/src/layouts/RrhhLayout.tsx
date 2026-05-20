import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Sidebar } from '../components/common/Sidebar';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Empleados', icon: <PeopleIcon />, path: '/empleados' },
  { text: 'Solicitudes', icon: <AssignmentIcon />, path: '/solicitudes' },
  { text: 'Reportes', icon: <EventNoteIcon />, path: '/reportes' },
];

interface RrhhLayoutProps {
  onLogout: () => void;
}

export const RrhhLayout: React.FC<RrhhLayoutProps> = ({ onLogout }) => {
  const isMobile = useMediaQuery('(max-width:899px)');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setCollapsed(!collapsed);
  };

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
        title="RECURSOS HUMANOS"
      />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};