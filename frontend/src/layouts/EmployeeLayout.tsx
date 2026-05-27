import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Sidebar } from '../components/common/Sidebar';

import '../assets/styles/employee.css';

const menuItems = [
  {
    text: 'Registro',
    icon: <DashboardIcon />,
    path: '/employee',
  },
];

export const EmployeeLayout: React.FC<{
  onLogout: () => void;
}> = ({ onLogout }) => {

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down('md')
  );

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);

  const handleToggle = () => {

    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (

    <Box className="employee-layout">

      {/* APPBAR */}

      <AppBar
        position="fixed"
        className="employee-appbar"
      >

        <Toolbar className="employee-toolbar">

          {/* MENU */}

          <IconButton
            edge="start"
            onClick={handleToggle}
            className="employee-menu-button"
          >
            <MenuIcon />
          </IconButton>

          {/* TITULOS */}

          <Box className="employee-header-text">

            <Typography className="employee-title">

              Panel de Empleado

            </Typography>

          

           

          </Box>

          {/* AVATAR */}

          <Box className="employee-user-section">

            <Typography className="employee-user-text">

              Empleado

            </Typography>

            <Tooltip title="Empleado">

              <Avatar className="employee-avatar">

                E

              </Avatar>

            </Tooltip>

          </Box>

        </Toolbar>

      </AppBar>

      {/* SIDEBAR */}

      <Sidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        onToggle={handleToggle}
        onLogout={onLogout}
        menuItems={menuItems}
        title="EMPLEADO"
      />

      {/* MAIN */}

      <Box
        component="main"
        className="employee-main"
      >

        <Outlet />

      </Box>

    </Box>
  );
};