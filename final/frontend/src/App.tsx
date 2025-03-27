import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AssignUserRole, Dashboard, RoleManagement, UserManagement } from './Components/Profile/index.ts';
import Profile from './Components/Profile/Profile.tsx';
import './App.css';
import { Sidebar, Header } from './Components/Layout/index.ts';
import { UserRoleProvider, useUserRoleContext } from './Components/UserRoleContext/UserRoleContext.tsx';
import { ToastContainer } from 'react-toastify';
import Login from './Components/LoginRegister/Login.tsx';
import PrivateRoute from './Components/LoginRegister/PrivateRoute.tsx';
import UserDashboard from './Components/Dashboard/UserDashboard.tsx';
import CenteredSpinner from './Components/CustomLoader/CenteredSpinner.tsx';
// import Permission from './components/Permissions/Permission.tsx';
import ChnagePassword from './Components/LoginRegister/ChnagePassword.tsx';

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
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}

          {isAuthenticated && <AuthenticatedApp sidebarCollapsed={sidebarCollapsed} onSidebarToggle={handleSidebarToggle} onLogout={handleLogout} />}
        </Router>
      </UserRoleProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
};

const AuthenticatedApp: React.FC<{ sidebarCollapsed: boolean, onSidebarToggle: () => void, onLogout: () => void }> = ({ sidebarCollapsed, onSidebarToggle, onLogout }) => {
  const { role, loading } = useUserRoleContext();

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <CenteredSpinner />
        </div>
      </>
    )
  }

  return (
    <>
      <Sidebar collapsed={sidebarCollapsed} onToggle={onSidebarToggle} />
      <div className={`content nav-container ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ marginLeft: sidebarCollapsed ? '80px' : '250px', paddingTop: '60px', transition: 'margin-left 0.3s' }}>
        <Header collapsed={sidebarCollapsed} onToggle={onSidebarToggle} onLogout={onLogout} />
        <Container fluid>
          <Row>
            <Col>
              <Routes>
                {role === 'admin' && (
                  <>
                    <Route path="/" index element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
                    <Route path="/role-management" element={<PrivateRoute><RoleManagement /></PrivateRoute>} />
                    <Route path="/assign-role" element={<PrivateRoute><AssignUserRole /></PrivateRoute>} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </>
                )}

                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/account" element={<PrivateRoute><ChnagePassword /></PrivateRoute>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default App;