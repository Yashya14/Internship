import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext.tsx';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel'
import axiosInstance from '../Axios/axiosInstance.ts';

interface AddUserModalProps {
    show: boolean;
    onHide: () => void;
    user?: any; // optional user prop for editing
    // onUserUpdated: () => void; // Add callback function prop

}

const initialState = {
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
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onHide, user }) => {
    const { getCombinedData, getAllUsers } = useUserRoleContext(); //! getAllUsers
    const [userDetails, setUserDetails] = useState(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (user) {
            const formattedUser = {
                ...user,
                dateOfBirth: user.dateOfBirth.split('T')[0],
            }
            setUserDetails(formattedUser);
        } else {
            setUserDetails(initialState);
        }
    }, [user]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // clear error message when user enter data correctly
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        if (name === "gender") {
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                gender: value,
            }));
        } else if (name in userDetails.address) {
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                address: {
                    ...prevDetails.address,
                    [name]: value,
                },
            }));
        } else {
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    // validation for input fields
    const validateInputFeilds = () => {
        const newErrors: { [key: string]: string } = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!userDetails.firstName) {
            newErrors.firstName = 'First name is required';
        } else if (userDetails.firstName.length < 3) {
            newErrors.firstName = 'First name should be atleast 3 characters';
        }

        if (!userDetails.lastName) {
            newErrors.lastName = 'Last name is required';
        } else if (userDetails.lastName.length < 3) {
            newErrors.lastName = 'Last name should be atleast 3 characters';
        }

        if (!userDetails.email) {
            newErrors.email = "Email is required";
        } else if (!regex.test(userDetails.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!userDetails.username) newErrors.username = 'Username is required';
        if (!userDetails.phoneNumber) {
            newErrors.phoneNumber = "PhoneNumber is required";
        } else if (userDetails.phoneNumber.length !== 10) {
            newErrors.phoneNumber = "PhoneNumber should be 10 digits";
        }
        if (!userDetails.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else if (new Date(userDetails.dateOfBirth) > new Date()) {
            newErrors.dateOfBirth = 'Date of birth should not be future date';
        }

        if (!userDetails.gender) newErrors.gender = 'Gender is required';
        if (!userDetails.address.street) newErrors.street = 'Street is required';
        if (!userDetails.address.city) newErrors.city = 'City is required';
        if (!userDetails.address.zipcode) newErrors.zipcode = 'Zipcode is required';
        if (!userDetails.address.state) newErrors.state = 'State is required';
        if (!userDetails.address.country) newErrors.country = 'Country is required';

        return newErrors;
    };

    // adding new user 
    const handleAddUser = async () => {
        const validationErrors = validateInputFeilds();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (user) {
                await axiosInstance.put(`/users/${user._id}`, userDetails);
                toast.success('User updated successfully!');
            } else {
                await axiosInstance.post('/users', userDetails);
                toast.success('User added successfully!');
                getAllUsers(); //! getAllUsers for to see the updated user in assign user role
            }
            setUserDetails(initialState);
            getCombinedData();
            onHide();
        } catch (error) {
            toast.error('There was an error saving the user!');

        }
    };


    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg" centered className="mt-0 custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>{user ? "Edit User" : "Add User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='mt-2'>
                        <Col xs={12} sm={6} lg={4}>
                            <Form.Group controlId="formFirstName" className="mb-2">
                                <Form.Label>First Name<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    value={userDetails.firstName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.firstName}
                                    min={3}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} lg={4}>
                            <Form.Group controlId="formLastName" className='mb-2'>
                                <Form.Label>Last Name<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    value={userDetails.lastName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.lastName}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} lg={4}>
                            <Form.Group controlId="formEmail" className='mb-2'>
                                <Form.Label>Email<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    size="sm"
                                    placeholder="Enter email"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={6} lg={4}>
                            <Form.Group controlId="formUsername" className="mt-2">
                                <Form.Label>Username<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter username"
                                    name="username"
                                    value={userDetails.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} lg={4}>
                            <Form.Group controlId="formPhoneNumber" className="mt-2">
                                <Form.Label>Phone Number<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter phone number"
                                    name="phoneNumber"
                                    value={userDetails.phoneNumber}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phoneNumber}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} lg={4}>
                            <Form.Group controlId="formDateOfBirth" className="mt-2">
                                <Form.Label>Date of Birth<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    size="sm"
                                    placeholder="Enter date of birth"
                                    name="dateOfBirth"
                                    value={userDetails.dateOfBirth}
                                    onChange={handleChange}
                                    isInvalid={!!errors.dateOfBirth}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dateOfBirth}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="formGender" className="mt-2">
                                <Form.Label>Gender<span className='required-feilds'>*</span></Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={userDetails.gender === 'male'}
                                        onChange={handleChange}
                                        isInvalid={!!errors.gender}
                                    />
                                    <FormCheckLabel htmlFor='male' className='me-3'>Male</FormCheckLabel>

                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={userDetails.gender === 'female'}
                                        onChange={handleChange}
                                        isInvalid={!!errors.gender}
                                    />
                                    <FormCheckLabel htmlFor='female' className='me-3'>Female</FormCheckLabel>

                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        value="other"
                                        checked={userDetails.gender === 'other'}
                                        onChange={handleChange}
                                        isInvalid={!!errors.gender}
                                    />
                                    <FormCheckLabel htmlFor='other'>Other</FormCheckLabel>

                                </div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.gender}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                    </Row>
                    <h4 className='mt-3'>Address Details</h4><hr />
                    <Row>
                        <Col xs={12} >
                            <Form.Group controlId="formStreet" className='mt-2'>
                                <Form.Label>Street<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter street"
                                    name="street"
                                    value={userDetails.address.street}
                                    onChange={handleChange}
                                    isInvalid={!!errors.street}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.street}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="formCity" className="mt-2">
                                <Form.Label>City<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter city"
                                    name="city"
                                    value={userDetails.address.city}
                                    onChange={handleChange}
                                    isInvalid={!!errors.city}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="formZipcode" className="mt-2">
                                <Form.Label>Zipcode<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter zipcode"
                                    name="zipcode"
                                    value={userDetails.address.zipcode}
                                    onChange={handleChange}
                                    isInvalid={!!errors.zipcode}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.zipcode}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="formState" className="mt-2">
                                <Form.Label>State<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter state"
                                    name="state"
                                    value={userDetails.address.state}
                                    onChange={handleChange}
                                    isInvalid={!!errors.state}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.state}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="formCountry" className="mt-2">
                                <Form.Label>Country<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter country"
                                    name="country"
                                    value={userDetails.address.country}
                                    onChange={handleChange}
                                    isInvalid={!!errors.country}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                    </Row>
                </Form>
                <div className='d-flex justify-content-end mt-3 pb-3'>
                    <Button variant="secondary" onClick={onHide} className='me-2'>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddUser} >
                        {user ? "Update" : "Save"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal >
    );
};

export default AddUserModal;
