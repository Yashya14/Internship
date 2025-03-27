import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData });
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100" >
        <Col md={6} className='p-4 border rounded shadow'>
          <h2 className='mb-2 text-center'>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className='mb-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Enter your name'
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className='mb-2'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Enter your email'
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='Enter your password'
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default Register;
