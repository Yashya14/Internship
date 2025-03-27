import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MultiStepForm from './components/MultiStepForm';
import CustomNavbar from './pages/CustomNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { FormProvider } from './forms/FormContext';
import EmployeeList from './components/EmployeeList';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <>
      <CustomNavbar isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <Container fluid className={`my-5 px-0 ${isDarkMode ? 'dark' : 'light'}`}>
        <Row className="w-100">
          <FormProvider>
            <Col xs={12} md={6} className="p-0">
              <MultiStepForm />
            </Col>
            <Col xs={12} md={6} className="p-0">
              <EmployeeList />
            </Col>
          </FormProvider>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;