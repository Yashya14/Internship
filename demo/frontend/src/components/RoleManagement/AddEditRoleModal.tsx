import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext.tsx';
import axiosInstance from '../Axios/axiosInstance.ts';

const rolesData = [
    "Developer",
    "Intern",
    "Executive",
    "Manager",
    "Administrator",
    "Designer",
    "Support",
    "Sales",
    "Marketing",
    "Human Resources",
    "Operations",
    "Finance",
    "Data Analyst",
    "Quality Assurance",
    "Business Analyst"
]


interface AddEditRoleModalProps {
    show: boolean;
    onHide: () => void;
    role?: any; // optional user prop for editing
    // onRoleUpdated: () => void; // Add callback function prop
}

const initialState = {
    roleName: "",
    roleType: "",
    status: "",
    roleDescription: "",
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canView: false
}


const AddEditRoleModal: React.FC<AddEditRoleModalProps> = ({ show, onHide, role }) => {
    const { getAllRoles } = useUserRoleContext();
    const [roleDetails, setRoleDetails] = useState(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (role) {
            setRoleDetails(role);
        } else {
            setRoleDetails(initialState);
        }
    }, [role]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // clear error message when user enter data correctly
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        setRoleDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

    };

    // validation for input fields
    const validateInputFeilds = () => {
        const newErrors: { [key: string]: string } = {};

        if (!roleDetails.roleName) {
            newErrors.roleName = 'Role name is required';
        } else if (roleDetails.roleName.length < 3) {
            newErrors.roleName = 'Role name should be atleast 3 characters';
        }
        if (!roleDetails.roleType) newErrors.roleType = 'Role type is required';
        if (!roleDetails.status) newErrors.status = 'Status is required';

        return newErrors;
    };

    // adding new user 
    const handleAddRole = async () => {
        const validationErrors = validateInputFeilds();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const roleData = {
            ...roleDetails,
            permissions: {
                user_permissions: [
                    roleDetails.canAdd ? 'add_user' : '',
                    roleDetails.canEdit ? 'edit_user' : '',
                    roleDetails.canDelete ? 'delete_user' : '',
                    roleDetails.canView ? 'view_user' : ''
                ].filter(Boolean),
                role_permissions: []
            }
        };

        try {
            if (role) {
                await axiosInstance.put(`/roles/${role._id}`, roleData);
                toast.success('Role updated successfully!');
            } else {
                await axiosInstance.post('/roles', roleData);
                toast.success('Role added successfully!');
            }
            setRoleDetails(initialState);
            getAllRoles();
            onHide();
        } catch (error) {
            toast.error('There was an error saving the role!');
        }
    };


    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg" className="mt-0 custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>{role ? "Edit Role" : "Add Role"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='mt-2'>
                        <Col xs={12} sm={12} lg={4}>
                            <Form.Group controlId="formRoleName" className="mb-2">
                                <Form.Label>Role Name<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Enter role name"
                                    name="roleName"
                                    value={roleDetails.roleName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.roleName}
                                    min={3}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.roleName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} lg={4}>
                            <Form.Group controlId="formRoleType" className='mb-2'>
                                <Form.Label>Role Type<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    size="sm"
                                    name="roleType"
                                    value={roleDetails.roleType}
                                    onChange={handleChange}
                                    isInvalid={!!errors.roleType}
                                    required
                                >
                                    <option value="">Select role type</option>
                                    {rolesData.map((role, index) => {
                                        return <option key={index} value={role}>{role}</option>
                                    })}

                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.roleType}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} lg={4}>
                            <Form.Group controlId="formStatus" className='mb-2'>
                                <Form.Label>Status<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    size="sm"
                                    name="status"
                                    value={roleDetails.status}
                                    onChange={handleChange}
                                    isInvalid={!!errors.status}
                                    required
                                >
                                    <option value="">Select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.status}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formRoleDescription" className='mb-2'>
                                <Form.Label>Role Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    name="roleDescription"
                                    value={roleDetails.roleDescription}
                                    onChange={handleChange}
                                    placeholder='Enter role description'
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                            <h5 className='mt-2'>Permissions</h5>
                            <Form.Group controlId="formPermissions" className='mb-2'>
                                <Form.Label>User Permissions : </Form.Label>
                                <div className="d-flex mb-2">
                                    <Form.Check
                                        type="checkbox"
                                        label="Add User"
                                        name="canAdd"
                                        checked={roleDetails.canAdd || false}
                                        onChange={(e) => setRoleDetails({ ...roleDetails, canAdd: e.target.checked })}
                                        className="me-3"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Edit User"
                                        name="canEdit"
                                        checked={roleDetails.canEdit || false}
                                        onChange={(e) => setRoleDetails({ ...roleDetails, canEdit: e.target.checked })}
                                        className="me-3"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Delete User"
                                        name="canDelete"
                                        checked={roleDetails.canDelete || false}
                                        onChange={(e) => setRoleDetails({ ...roleDetails, canDelete: e.target.checked })}
                                        className="me-3"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="View User"
                                        name="canView"
                                        checked={roleDetails.canView || false}
                                        onChange={(e) => setRoleDetails({ ...roleDetails, canView: e.target.checked })}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
                <div className='d-flex justify-content-end mt-3 pb-3'>
                    <Button variant="secondary" onClick={onHide} className='me-2'>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddRole} >
                        {role ? "Update" : "Save"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal >
    );
};

export default AddEditRoleModal;
