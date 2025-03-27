import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTabs from './components/EmployeeTabs';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <>
      <Container>
        <EmployeeTabs />
      </Container>
    </>
  )
}

export default App