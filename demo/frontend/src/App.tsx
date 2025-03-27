import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AssignUserRole, Dashboard, RoleManagement, UserManagement } from './components/SideMenus/index.ts';
import Profile from './components/SideMenus/Profile.tsx';
import './App.css';
import { Sidebar, NavbarComponent } from './components/Layout/index.ts';
import { UserRoleProvider } from './components/UserRoleContext/UserRoleContext.tsx';
import { ToastContainer } from 'react-toastify';
import Login from './components/LoginRegister/Login.tsx';
import PrivateRoute from './components/LoginRegister/PrivateRoute.tsx';
// import Register from './components/LoginRegister/Register.tsx';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken')); // Check if the user is authenticated

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log('User logged in');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    console.log('User logged out');
  };

  return (
    <>
      <UserRoleProvider isAuthenticated={isAuthenticated}>
        <Router>
          {!isAuthenticated && (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}

          {isAuthenticated && <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />}
          {isAuthenticated && (
            <div className={`content nav-container ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ marginLeft: sidebarCollapsed ? '80px' : '250px', paddingTop: '60px', transition: 'margin-left 0.3s' }}>
              <NavbarComponent collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} onLogout={handleLogout} />
              <Container fluid>
                <Row>
                  <Col>
                    <Routes>
                      <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                      <Route path="/user-management" element={<PrivateRoute component={UserManagement} />} />
                      <Route path="/role-management" element={<PrivateRoute component={RoleManagement} />} />
                      <Route path="/assign-role" element={<PrivateRoute component={AssignUserRole} />} />
                      <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </Col>
                </Row>
              </Container>
            </div>
          )}

        </Router>
      </UserRoleProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;