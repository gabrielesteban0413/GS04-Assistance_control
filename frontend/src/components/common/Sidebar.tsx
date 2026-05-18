import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
  menuItems: MenuItem[];
  title: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  mobileOpen,
  collapsed,
  onToggle,
  onLogout,
  menuItems,
  title,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const handleToggleSubmenu = (text: string) => {
    setOpenSubmenus(prev => ({ ...prev, [text]: !prev[text] }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onToggle();
  };

  let sidebarClasses = 'sidebar';
  if (!isMobile) {
    sidebarClasses += collapsed ? ' collapsed' : ' open';
  } else {
    sidebarClasses += mobileOpen ? ' mobile-open' : '';
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = !!item.children?.length;
    const isActive = item.path ? location.pathname === item.path : false;
    const isOpen = openSubmenus[item.text] || false;

    // En escritorio colapsado: solo icono, sin texto, sin submenú
    if (!isMobile && collapsed) {
      return (
        <div key={item.text} className="sidebar-list-item">
          <button
            className="sidebar-list-button"
            onClick={() => {
              if (hasChildren && item.children?.[0]?.path) {
                handleNavigation(item.children[0].path);
              } else if (item.path) {
                handleNavigation(item.path);
              }
            }}
            title={item.text}
          >
            <span className="sidebar-list-icon">{item.icon}</span>
          </button>
        </div>
      );
    }

    return (
      <div key={item.text}>
        <div className="sidebar-list-item">
          <button
            className={`sidebar-list-button ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (hasChildren) handleToggleSubmenu(item.text);
              else if (item.path) handleNavigation(item.path);
            }}
          >
            <span className="sidebar-list-icon">{item.icon}</span>
            <span className="sidebar-list-text">{item.text}</span>
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </button>
        </div>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <div className="sidebar-submenu">
              {item.children!.map(child => renderMenuItem(child, depth + 1))}
            </div>
          </Collapse>
        )}
      </div>
    );
  };

  return (
    <div className={sidebarClasses}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={onToggle}>
          {isMobile ? <MenuIcon /> : (collapsed ? <MenuIcon /> : <ChevronLeftIcon />)}
        </button>
        {(!isMobile && !collapsed) && <span className="sidebar-header-title">{title}</span>}
        {(isMobile && mobileOpen) && <span className="sidebar-header-title">{title}</span>}
      </div>
      <div className="sidebar-content">
        <div className="sidebar-list">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
        <div className="sidebar-footer">
          <button className="sidebar-logout-button" onClick={onLogout}>
            <ExitToAppIcon />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};