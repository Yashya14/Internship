import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { SiTypescript } from "react-icons/si";
import './Sidebar.css';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import { RiDashboard3Fill } from "react-icons/ri";
import { FaUser, FaUsers, FaUserShield, FaUserTag } from 'react-icons/fa';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const { role } = useUserRoleContext();

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo py-2 px-3 text-center">
        <SiTypescript style={{ fontSize: "2rem", margin: "4px", marginRight: "4px" }} />
        {!collapsed && <span>TeamSphere</span>}
      </div>

      <Nav defaultActiveKey="/" className="flex-column">
        {role !== 'admin' && (
          <>
            <Nav.Link as={Link} to="/dashboard" className={`nav-link-custom ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <RiDashboard3Fill className="sidebar-menus" />

              {!collapsed && 'Dashboard'}
            </Nav.Link>

            <Nav.Link as={Link} to="/profile" className={`nav-link-custom ${location.pathname === '/profile' ? 'active' : ''}`}>
              <FaUser className="sidebar-menus" />
              {!collapsed && 'Profile'}
            </Nav.Link>
          </>
        )}
        {role === 'admin' && (
          <>
            <Nav.Link as={Link} to="/dashboard" className={`nav-link-custom ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <RiDashboard3Fill className="sidebar-menus" />
              {!collapsed && 'Dashboard'}
            </Nav.Link>

            <Nav.Link as={Link} to="/user-management" className={`nav-link-custom ${location.pathname === '/user-management' ? 'active' : ''}`}>
              <FaUsers className="sidebar-menus" />
              {!collapsed && 'User Management'}
            </Nav.Link>

            <Nav.Link as={Link} to="/role-management" className={`nav-link-custom ${location.pathname === '/role-management' ? 'active' : ''}`}>
              <FaUserShield className="sidebar-menus" />
              {!collapsed && 'Role Management'}
            </Nav.Link>

            <Nav.Link as={Link} to="/assign-role" className={`nav-link-custom ${location.pathname === '/assign-role' ? 'active' : ''}`}>
              <FaUserTag className="sidebar-menus" />
              {!collapsed && 'Assign Role'}
            </Nav.Link>

            {/* <Nav.Link as={Link} to="/permission" className={`nav-link-custom ${location.pathname === '/permission' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUsersGear} className="sidebar-menus" />
              {!collapsed && 'Permissions'}
            </Nav.Link> */}
          </>
        )}

      </Nav>
    </div>
  );
};

export default Sidebar;