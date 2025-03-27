import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo py-2 px-3 text-center">
        <i className="fas fa-code" />
        {!collapsed && <span>TeamSphere</span>}
      </div>
      {/* <hr /> */}
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className={`nav-link-custom ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <i className="fas fa-tachometer-alt" />
          {!collapsed && 'Dashboard'}
        </Nav.Link>
        <Nav.Link as={Link} to="/user-management" className={`nav-link-custom ${location.pathname === '/user-management' ? 'active' : ''}`}>
          <i className="fas fa-users" />
          {!collapsed && 'User Management'}
        </Nav.Link>
        <Nav.Link as={Link} to="/role-management" className={`nav-link-custom ${location.pathname === '/role-management' ? 'active' : ''}`}>
          <i className="fas fa-user-shield" />
          {!collapsed && 'Role Management'}
        </Nav.Link>
        <Nav.Link as={Link} to="/assign-role" className={`nav-link-custom ${location.pathname === '/assign-role' ? 'active' : ''}`}>
          <i className="fas fa-user-tag" />
          {!collapsed && 'Assign Role'}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;