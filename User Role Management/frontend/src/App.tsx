import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AssignUserRole, Dashboard, RoleManagement, UserManagement } from './components/SideMenus/index.ts';
import './App.css';
import { Sidebar, NavbarComponent } from './components/index.ts';
import { UserRoleProvider } from './components/UserRoleContext/UserRoleContext.tsx';
import { ToastContainer } from 'react-toastify';
// import Register from './components/LoginRegister/Register.tsx';
// import AdminLayout from './components/LoginRegister/AdminLayout.tsx';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <UserRoleProvider>
        <Router>
          <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
          <div className={`content nav-container ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ marginLeft: sidebarCollapsed ? '80px' : '250px', paddingTop: '60px', transition: 'margin-left 0.3s' }}>
            <NavbarComponent collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
            <Container fluid>
              <Row>
                <Col>
                  <Routes>
                    <Route path="/" element={<h1>Hello World!</h1>} />
                    <Route path="/dashboard" index element={<Dashboard />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/role-management" element={<RoleManagement />} />
                    <Route path="/assign-role" element={<AssignUserRole />} />
                  </Routes>
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      </UserRoleProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;