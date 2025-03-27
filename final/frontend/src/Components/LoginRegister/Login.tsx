import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios/axiosInstance';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginImg from '/assets/loginpage.webp';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; emailPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the specific field's error if it's been updated
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }

    // Also clear the emailPassword error when typing
    if (errors.emailPassword) {
      setErrors({
        ...errors,
        emailPassword: undefined
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; emailPassword?: string } = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/login', {
        email: formData.email,
        password: formData.password
      });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken); // Store the token in local storage
      localStorage.setItem('userId', response.data.userId); // Store the user ID in local storage
      setErrors({}); // Clear errors on successful login
      onLogin(); // Call the onLogin prop to update the app state
      navigate('/dashboard'); // Navigate to the dashboard
      toast.success('Login successful!');
    } catch (err) {
      setErrors({ emailPassword: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-md-row ms-5 mt-2">
        {/* <img src={TsImg} alt="TeamSphere Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> */}
        <h1 className='text-primary text-bold mt-2 mt-md-0'>TeamSphere</h1>
      </div>
      <Container className="d-flex align-items-center justify-content-center min-vh-90 mt-5">
        <Row className="w-100">
          <Col md={6} lg={5} className="mx-auto d-flex align-items-center justify-content-center">
            <img src={LoginImg} alt='loginimg' className="img-fluid" />
          </Col>

          <Col md={6} lg={5} className="mx-auto py-5 ">
            <h2 className="h2 h-md-3 h-lg-2 ">Welcome Back &#58;&#41;</h2>
            <p className='mb-4 d-none d-md-block' style={{ fontSize: '1rem' }}>To keep connected with us please login with your personal information by email address and password &#128276;</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>

              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text><FaLock /></InputGroup.Text>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="password"
                    placeholder="Enter your password"
                    isInvalid={!!errors.password}
                  />
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </Form.Group>

              {errors.emailPassword && <p className="text-danger">{errors.emailPassword}</p>}

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Col>
        </Row >
      </Container >
    </>
  );
};

export default Login;