import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';  // Import react-select
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import { toast } from 'react-toastify';
import axiosInstance from '../Axios/axiosInstance';

interface AssignUserRoleModalProps {
    show: boolean;
    onHide: () => void;
    editMode?: boolean;
    userRoleData?: any;
}

interface IAssignUserRole {
    userId: string;
    roleIds: string[];
}

const initialState: IAssignUserRole = {
    userId: "",
    roleIds: []
}

const AssignUserRoleModal: React.FC<AssignUserRoleModalProps> = ({ show, onHide, editMode = false, userRoleData }) => {
    const { users, roles, userRole, getAllAssignUserRole, getCombinedData } = useUserRoleContext();
    const [assignUserRole, setAssignUserRole] = useState<IAssignUserRole>(initialState);
    const [errors, setErrors] = useState<IAssignUserRole>({ userId: '', roleIds: [] });

    useEffect(() => {
        if (editMode && userRoleData) {
            setAssignUserRole({
                userId: userRoleData.user,
                roleIds: userRoleData.role || []  // Assuming role_ids is an array in userRoleData
            });
        } else {
            setAssignUserRole(initialState);
        }
    }, [editMode, userRoleData]);

    const handleChange = (e: { target: { name: string; value: any; } }) => {
        const { name, value } = e.target;
        setAssignUserRole(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    }

    const handleRoleChange = (selectedRoles: any) => {
        const roleIds = selectedRoles ? selectedRoles.map((role: { value: string }) => role.value) : [];
        setAssignUserRole(prevDetails => ({
            ...prevDetails,
            roleIds
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            roleIds: []
        }));
    }

    const handleAssignRole = async () => {
        const { userId, roleIds } = assignUserRole;
        let validationErrors: IAssignUserRole = { userId: '', roleIds: [] };

        if (userId === "") validationErrors.userId = 'Please select a user.';
        if (roleIds.length === 0) validationErrors.roleIds = ['Please select at least one role.'];

        setErrors(validationErrors);

        if (validationErrors.userId || validationErrors.roleIds.length > 0) {
            return;
        }

        try {
            if (editMode) {
                await axiosInstance.put(`/user-role/${userRoleData._id}`, assignUserRole);
                toast.success('User roles updated successfully!');
                setAssignUserRole(initialState);
                getAllAssignUserRole();
                getCombinedData();
                onHide();
                return;
            } else {
                // Check if user already has the selected roles
                if (userRole) {
                    const existingUserRoles = userRole.filter(ur => ur.user_id === assignUserRole.userId && roleIds.includes(ur.role_id));

                    if (existingUserRoles.length > 0) {
                        return toast.error('This user already has one of the selected roles!');
                    }
                }

                await axiosInstance.post('/user-role', { userId, roleIds });
                toast.success('User roles assigned successfully!');
                setAssignUserRole(initialState);
                getAllAssignUserRole();
                getCombinedData();
                onHide();
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error('There was an error saving the user roles!');
        }
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" className="mt-0 custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? "Edit Mode" : "Assign Roles"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='mt-2'>
                        <Col>
                            <Form.Group controlId="formUser" className='mb-2'>
                                <Form.Label>Full Name<span className='required-feilds'>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    size="sm"
                                    name="userId"
                                    required
                                    onChange={handleChange}
                                    value={assignUserRole.userId}
                                    disabled={editMode}
                                >
                                    <option value="">Select User</option>
                                    {users && users.map((user) => {
                                        return <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                                    })}
                                </Form.Control>
                                {errors.userId && <span className="text-danger">{errors.userId}</span>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-2'>
                        <Col>
                            <Form.Group controlId="formRole" className='mb-2'>
                                <Form.Label>Roles<span className='required-feilds'>*</span></Form.Label>
                                <Select
                                    isMulti
                                    name="roleIds"
                                    options={roles?.map(role => ({
                                        value: role._id,
                                        label: role.roleName
                                    }))}
                                    value={roles?.filter(role => assignUserRole.roleIds.includes(role._id)).map(role => ({
                                        value: role._id,
                                        label: role.roleName
                                    }))}
                                    onChange={handleRoleChange}
                                />
                                {errors.roleIds?.length > 0 && <span className="text-danger">{errors.roleIds[0]}</span>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <div className='d-flex justify-content-end mt-3 pb-3'>
                    <Button onClick={onHide} variant="secondary" className='me-2'>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAssignRole}>
                        {editMode ? "Update" : "Assign"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AssignUserRoleModal;