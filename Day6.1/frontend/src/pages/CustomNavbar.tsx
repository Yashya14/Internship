import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, NavbarBrand } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { FaBars, FaTimes } from 'react-icons/fa';
import './CustomNavbar.css';

interface CustomNavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ isDarkMode, onThemeToggle }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <Navbar fixed="top" expand="lg" className={`navbar-custom ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        <NavbarBrand href="/" className="navbar-brand">
          <span className="brand-name">TeamSphere</span>
        </NavbarBrand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={handleNavbarToggle}
          className="custom-navbar-toggle"
        >
          {isNavbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav" className={isNavbarOpen ? 'show' : ''}>
          <Nav className="ml-auto align-items-center">
            <Nav.Link href="/login" className="nav-item">Login</Nav.Link>
            <Nav.Link href="/signup" className="nav-item">Sign Up</Nav.Link>
            <Nav.Link href="https://github.com" target="_blank" className="nav-item">
              <FaGithub size={20} />
            </Nav.Link>
            <Button
              variant="link"
              onClick={onThemeToggle}
              className="theme-toggle-btn"
            >
              {isDarkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;