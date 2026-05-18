import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
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

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onToggle();
  };

  // Clases para el sidebar
  let sidebarClasses = 'sidebar';
  if (!isMobile) {
    sidebarClasses += collapsed ? ' collapsed' : ' open';
  } else {
    sidebarClasses += mobileOpen ? ' mobile-open' : '';
  }

  // Determina si se muestra el título en el header
  const showTitle = (!isMobile && !collapsed) || (isMobile && mobileOpen);
  // Determina si se muestra el texto de los ítems y del botón de logout
  const showText = (!isMobile && !collapsed) || (isMobile && mobileOpen);

  const toggleIcon = isMobile ? <MenuIcon /> : (collapsed ? <MenuIcon /> : <ChevronLeftIcon />);

  return (
    <div className={sidebarClasses}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={onToggle}>
          {toggleIcon}
        </button>
        {showTitle && <span className="sidebar-header-title">{title}</span>}
      </div>
      <div className="sidebar-content">
        <div className="sidebar-list">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.text} className="sidebar-list-item">
                <button
                  className={`sidebar-list-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className="sidebar-list-icon">{item.icon}</span>
                  {showText && <span className="sidebar-list-text">{item.text}</span>}
                </button>
              </div>
            );
          })}
        </div>
        <div className="sidebar-footer">
          <button className="sidebar-logout-button" onClick={onLogout}>
            <ExitToAppIcon />
            {showText && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </div>
  );
};