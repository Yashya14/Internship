import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AssignUserRole, Dashboard, RoleManagement, UserManagement } from './components/SideMenus/index.ts';
import './App.css';
import { Sidebar, NavbarComponent } from './components/Layout/index.ts';
import { UserRoleProvider } from './components/UserRoleContext/UserRoleContext.tsx';
import { ToastContainer } from 'react-toastify';
import Home from './components/LoginRegister/Home.tsx';
// import Register from './components/LoginRegister/Register.tsx';
// import AdminLayout from './components/LoginRegister/AdminLayout.tsx';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <UserRoleProvider>
        <Router>
          <AppContent sidebarCollapsed={sidebarCollapsed} handleSidebarToggle={handleSidebarToggle} />
        </Router>
      </UserRoleProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
};

const AppContent: React.FC<{ sidebarCollapsed: boolean, handleSidebarToggle: () => void }> = ({ sidebarCollapsed, handleSidebarToggle }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && (
        <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      )}
      <div className={`content nav-container ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ marginLeft: sidebarCollapsed ? '80px' : '250px', paddingTop: '60px', transition: 'margin-left 0.3s' }}>
        {!isHomePage && (
          <NavbarComponent collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
        )}
        <Container fluid>
          <Row>
            <Col>
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/role-management" element={<RoleManagement />} />
                <Route path="/assign-role" element={<AssignUserRole />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default App;