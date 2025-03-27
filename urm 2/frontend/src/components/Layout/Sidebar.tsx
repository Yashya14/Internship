import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';s
import { SiTypescript } from "react-icons/si";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidebar.css';
import { faGauge, faUsers, faUserShield, faUserTag } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo py-2 px-3 text-center">
        {/* <i className="fas fa-code" /> */}
        <SiTypescript style={{ fontSize: "2rem", margin: "4px", marginRight: "4px" }} />
        {!collapsed && <span>TeamSphere</span>}
      </div>
      {/* <hr /> */}
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className={`nav-link-custom ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faGauge} className="sidebar-menus" />
          {!collapsed && 'Dashboard'}
        </Nav.Link>

        <Nav.Link as={Link} to="/user-management" className={`nav-link-custom ${location.pathname === '/user-management' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUsers} className="sidebar-menus" />
          {!collapsed && 'User Management'}
        </Nav.Link>

        <Nav.Link as={Link} to="/role-management" className={`nav-link-custom ${location.pathname === '/role-management' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUserShield} className="sidebar-menus" />
          {!collapsed && 'Role Management'}
        </Nav.Link>

        <Nav.Link as={Link} to="/assign-role" className={`nav-link-custom ${location.pathname === '/assign-role' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUserTag} className="sidebar-menus" />
          {!collapsed && 'Assign Role'}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;