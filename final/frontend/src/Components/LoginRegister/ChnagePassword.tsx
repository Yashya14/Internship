import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axiosInstance from '../Axios/axiosInstance';
import { toast } from 'react-toastify';

const ChangePassword: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (newPassword !== confirmPassword) {
            setFieldErrors({ confirmPassword: 'New password and confirm password do not match' });
            return;
        }

        try {
            const response = await axiosInstance.post('/change-password', {
                userId: userId || '',
                oldPassword,
                newPassword,
            });

            if (response.status === 200) {
                toast.success('Password changed successfully');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(response.data.message || 'Failed to change password');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to change password');
            console.error(error);
        }
    };

    const handleReset = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setFieldErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') setOldPassword(value);
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);


        setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    return (
        <Container className="mt-4 mb-4 ">
            <Row className="justify-content-md-center ">
                <Col md={6} className="shadow-lg p-4 bg-body rounded">
                    <h2 className="mb-4">Change Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="oldPassword" className="mb-3">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter old password"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={handleChange}
                                required
                                size="sm"
                                isInvalid={!!fieldErrors.oldPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.oldPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="newPassword" className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handleChange}
                                required
                                size="sm"
                                isInvalid={!!fieldErrors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.newPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                required
                                size="sm"
                                isInvalid={!!fieldErrors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" size="sm" type="submit">
                            Change Password
                        </Button>
                        <Button variant="secondary" size="sm" className="ms-2" type="reset" onClick={handleReset}>
                            Reset
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;