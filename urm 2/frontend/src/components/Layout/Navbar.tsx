import React from 'react';
import {  Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

interface NavbarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, onToggle }) => {
  return (
    <div className={`top-bar ${collapsed ? 'collapsed' : ''}`}>
      <div className="navbar-left">
        <Button variant="link" onClick={onToggle} className="toggle-button">
          <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} collapse-icon`} />
        </Button>
        {/* <InputGroup className="search-group">
          <Form.Control type="text" placeholder="Search..." className="search-input" />
          <Button variant="outline-secondary">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup> */}
      </div>
      <Dropdown className="profile-dropdown">
        <Dropdown.Toggle variant="" id="dropdown-basic" className="profile-toggle">
          <img alt="Profile Icon" src="https://placehold.co/40x40" className="profile-icon" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
          <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
          <Dropdown.Item as="button">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Navbar;