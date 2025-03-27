import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Header.css';

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
    navigate('/login');
  };



  return (
    <div className={`top-bar ${collapsed ? 'collapsed' : ''}`}>
      <div className="header-left">
        <Button variant="link" onClick={onToggle} className="toggle-button" title="Toggle Sidebar">
          {collapsed ? <FaChevronRight className='collapse-icon' /> : <FaChevronLeft className='collapse-icon' />}
        </Button>
      </div>
      <Dropdown className="profile-dropdown">
        <Dropdown.Toggle id="dropdown-basic" className="profile-toggle">
          <img alt="Profile Icon" src="https://placehold.co/40x40" className="profile-icon" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
          <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Header;