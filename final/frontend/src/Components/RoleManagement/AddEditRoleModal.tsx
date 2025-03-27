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
}

const initialState = {
    roleName: "",
    roleType: "",
    status: "",
    roleDescription: "",
    canAddUser: false,
    canEditUser: false,
    canDeleteUser: false,
    canViewUser: false,
    canAddRole: false,
    canEditRole: false,
    canDeleteRole: false,
    canViewRole: false,
    canAssignRole: false,
    canEditAssignRole: false,
    canDeleteAssignRole: false,
    canViewAssignRole: false,
}

const AddEditRoleModal: React.FC<AddEditRoleModalProps> = ({ show, onHide, role }) => {
    const { getAllRoles } = useUserRoleContext();
    const [roleDetails, setRoleDetails] = useState(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [canSave, setCanSave] = useState<boolean>(false)

    useEffect(() => {
        if (role) {
            setRoleDetails({
                ...role,
                canAddUser: role.permissions.user_permissions.includes('add_user'),
                canEditUser: role.permissions.user_permissions.includes('edit_user'),
                canDeleteUser: role.permissions.user_permissions.includes('delete_user'),
                canViewUser: role.permissions.user_permissions.includes('view_user'),
                canAddRole: role.permissions.role_permissions.includes('add_role'),
                canEditRole: role.permissions.role_permissions.includes('edit_role'),
                canDeleteRole: role.permissions.role_permissions.includes('delete_role'),
                canViewRole: role.permissions.role_permissions.includes('view_role'),
                canAssignRole: role.permissions.assign_permissions.includes('assign_role'),
                canEditAssignRole: role.permissions.assign_permissions.includes('edit_assign_role'),
                canDeleteAssignRole: role.permissions.assign_permissions.includes('delete_assign_role'),
                canViewAssignRole: role.permissions.assign_permissions.includes('view_assign_role'),
            });
        } else {
            setRoleDetails(initialState);
        }
    }, [role]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        setRoleDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setRoleDetails((prevDetails) => ({
            ...prevDetails,
            [name]: checked,
        }));
    };

    const validateInputFields = () => {
        const newErrors: { [key: string]: string } = {};

        if (!roleDetails.roleName) {
            newErrors.roleName = 'Role name is required';
        } else if (roleDetails.roleName.length < 3) {
            newErrors.roleName = 'Role name should be at least 3 characters';
        }
        if (!roleDetails.roleType) newErrors.roleType = 'Role type is required';
        if (!roleDetails.status) newErrors.status = 'Status is required';

        return newErrors;
    };

    const handleAddRole = async () => {
        const validationErrors = validateInputFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const roleData = {
            ...roleDetails,
            permissions: {
                user_permissions: [
                    roleDetails.canAddUser ? 'add_user' : '',
                    roleDetails.canEditUser ? 'edit_user' : '',
                    roleDetails.canDeleteUser ? 'delete_user' : '',
                    roleDetails.canViewUser ? 'view_user' : ''
                ].filter(Boolean),
                role_permissions: [
                    roleDetails.canAddRole ? 'add_role' : '',
                    roleDetails.canEditRole ? 'edit_role' : '',
                    roleDetails.canDeleteRole ? 'delete_role' : '',
                    roleDetails.canViewRole ? 'view_role' : ''
                ].filter(Boolean),
                assign_permissions: [
                    roleDetails.canAssignRole ? 'assign_role' : '',
                    roleDetails.canEditAssignRole ? 'edit_assign_role' : '',
                    roleDetails.canDeleteAssignRole ? 'delete_assign_role' : '',
                    roleDetails.canViewAssignRole ? 'view_assign_role' : ''
                ].filter(Boolean)
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

    // save button disabled
    useEffect(() => {
        console.log("running...")
        const validationErrors = validateInputFields();
        const isFormValid = !Object.keys(validationErrors).length;
        setCanSave(isFormValid && roleDetails.roleName !== "" && roleDetails.roleType !== "" && roleDetails.status !== "");

    }, [roleDetails]);


    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg">
            <Modal.Header>
                <Modal.Title>{role ? "Edit Role" : "Add Role"}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Row>
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
                                    rows={2}
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
                            <Form.Group controlId="userFormPermissions" className='mb-2'>
                                <Form.Label>User Permissions : </Form.Label>
                                <div className="d-flex mb-2 gap-5">
                                    <Form.Check
                                        type="checkbox"
                                        label="Add"
                                        name="canAddUser"
                                        checked={roleDetails.canAddUser || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canAddUser"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Edit"
                                        name="canEditUser"
                                        checked={roleDetails.canEditUser || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canEditUser"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Delete"
                                        name="canDeleteUser"
                                        checked={roleDetails.canDeleteUser || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canDeleteUser"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="View"
                                        name="canViewUser"
                                        checked={roleDetails.canViewUser || false}
                                        onChange={handleCheckboxChange}
                                        id="canViewUser"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="roleFormPermissions" className='mb-2'>
                                <Form.Label>Role Permissions : </Form.Label>
                                <div className="d-flex mb-2 gap-5">
                                    <Form.Check
                                        type="checkbox"
                                        label="Add"
                                        name="canAddRole"
                                        checked={roleDetails.canAddRole || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canAddRole"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Edit"
                                        name="canEditRole"
                                        checked={roleDetails.canEditRole || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canEditRole"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Delete"
                                        name="canDeleteRole"
                                        checked={roleDetails.canDeleteRole || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canDeleteRole"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="View"
                                        name="canViewRole"
                                        checked={roleDetails.canViewRole || false}
                                        onChange={handleCheckboxChange}
                                        id="canViewRole"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="assignRoleFormPermissions" className='mb-2'>
                                <Form.Label>Assign Role Permissions : </Form.Label>
                                <div className="d-flex mb-2 gap-5">
                                    <Form.Check
                                        type="checkbox"
                                        label="Add"
                                        name="canAssignRole"
                                        checked={roleDetails.canAssignRole || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canAssignRole"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Edit"
                                        name="canEditAssignRole"
                                        checked={roleDetails.canEditAssignRole || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canEditAssignRole"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Delete"
                                        name="canDeleteAssignRole"
                                        checked={roleDetails.canDeleteAssignRole || false}
                                        onChange={handleCheckboxChange}
                                        className="me-3"
                                        id="canDeleteAssignRole"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="View"
                                        name="canViewAssignRole"
                                        checked={roleDetails.canViewAssignRole || false}
                                        onChange={handleCheckboxChange}
                                        id="canViewAssignRole"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end'>
                        <Button variant="secondary" size='sm' onClick={onHide} className='me-2'>
                            Cancel
                        </Button>
                        <Button variant="primary" size='sm' onClick={handleAddRole} disabled={!canSave}>
                            {role ? "Update" : "Save"}
                        </Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal >
    );
};

export default AddEditRoleModal;