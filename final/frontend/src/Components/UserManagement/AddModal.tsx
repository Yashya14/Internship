import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosInstance from '../Axios/axiosInstance.ts';

interface AddUserModalProps {
    show: boolean;
    onHide: () => void;
    user?: {
        id?: string | number;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        phoneNumber: string;
        dateOfBirth: string;
        gender: string;
        address: {
            street: string;
            city: string;
            zipcode: string;
            state: string;
            country: string;
        };
    };
}

const AddModal: React.FC<AddUserModalProps> = ({ show, onHide, user }) => {
    const config = [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true, validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) },
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true, validation: (value: string) => value.length === 10 },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, validation: (value: string) => new Date(value) <= new Date() },
        { name: 'gender', label: 'Gender', type: 'radio', options: ['male', 'female', 'other'], required: true },
        // Address fields
        { name: 'address.street', label: 'Street', type: 'text', required: true },
        { name: 'address.city', label: 'City', type: 'text', required: true },
        { name: 'address.zipcode', label: 'Zipcode', type: 'text', required: true },
        { name: 'address.state', label: 'State', type: 'text', required: true },
        { name: 'address.country', label: 'Country', type: 'text', required: true },
    ];

    const initialState: {
        [key: string]: any;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        phoneNumber: string;
        dateOfBirth: string;
        gender: string;
        address: {
            street: string;
            city: string;
            zipcode: string;
            state: string;
            country: string;
        };
    } = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        address: {
            street: '',
            city: '',
            zipcode: '',
            state: '',
            country: '',
        },
    };


    const [userDetails, setUserDetails] = useState<typeof initialState>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (user) {
            setUserDetails(user);
        } else {
            setUserDetails(initialState);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [, subField] = name.split('.');

        if (subField) {

            setUserDetails((prevDetails) => ({
                ...prevDetails,
                address: {
                    ...prevDetails.address,
                    [subField]: value,
                },
            }));
        } else {
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }


        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateInputFields = () => {
        const newErrors: { [key: string]: string } = {};

        config.forEach((field) => {
            const value = field.name.includes('.')
                ? (userDetails[field.name.split('.')[0] as keyof typeof userDetails] as any)[field.name.split('.')[1]]
                : userDetails[field.name as keyof typeof userDetails];

            if (field.required && !value) {
                newErrors[field.name] = `${field.label} is required`;
            }

            if (field.validation && !field.validation(value)) {
                newErrors[field.name] = `${field.label} is invalid`;
            }
        });

        return newErrors;
    };

    const handleAddUser = async () => {
        const validationErrors = validateInputFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (user) {
                await axiosInstance.put(`/users/${user.id}`, userDetails);
                toast.success('User updated successfully!');
            } else {
                await axiosInstance.post('/register', userDetails);
                toast.success('User added successfully!');
            }
            setUserDetails(initialState);
            onHide();
        } catch (error) {
            console.log({ error })
            toast.error('There was an error saving the user!');
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg">
            <Modal.Header>
                <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        {config.map((field) => {
                            const isNested = field.name.includes('.');

                            if (isNested) {
                                const [mainField, subField] = field.name.split('.');
                                return (
                                    <Col xs={12} sm={6} lg={4} key={field.name}>
                                        <Form.Group controlId={`form${field.name}`} className="mb-2">
                                            <Form.Label>
                                                {field.label}
                                                {field.required && <span className="required-feilds">*</span>}
                                            </Form.Label>
                                            <Form.Control
                                                type={field.type}
                                                size="sm"
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                                name={field.name}
                                                value={(userDetails[mainField as keyof typeof userDetails] as any)[subField]}
                                                onChange={handleChange}
                                                isInvalid={!!errors[field.name]}
                                                required={field.required}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors[field.name]}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                );
                            } else {
                                return (
                                    <Col xs={12} sm={6} lg={4} key={field.name}>
                                        <Form.Group controlId={`form${field.name}`} className="mb-2">
                                            <Form.Label>
                                                {field.label}
                                                {field.required && <span className="required-feilds">*</span>}
                                            </Form.Label>
                                            {field.type === 'radio' ? (
                                                <div>
                                                    {field.options?.map((option) => (
                                                        <Form.Check
                                                            inline
                                                            type="radio"
                                                            id={`${field.name}-${option}`}
                                                            name={field.name}
                                                            value={option}
                                                            checked={userDetails[field.name] === option}
                                                            onChange={handleChange}
                                                            key={option}
                                                            label={option.charAt(0).toUpperCase() + option.slice(1)}
                                                            isInvalid={!!errors[field.name]}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <Form.Control
                                                    type={field.type}
                                                    size="sm"
                                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                                    name={field.name}
                                                    value={userDetails[field.name]}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors[field.name]}
                                                    required={field.required}
                                                />
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                {errors[field.name]}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                );
                            }
                        })}
                    </Row>
                </Form>
                <div className="d-flex justify-content-end mt-2 pb-2">
                    <Button variant="secondary" size='sm' onClick={onHide} className="me-2">
                        Cancel
                    </Button>
                    <Button variant="primary" size='sm' onClick={handleAddUser}>
                        {user ? 'Update' : 'Save'}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;
