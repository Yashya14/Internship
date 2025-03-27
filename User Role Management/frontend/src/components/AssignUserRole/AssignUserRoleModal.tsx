import React, { useState, useEffect } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import { toast } from 'react-toastify';
import axiosInstance from '../axios/axiosInstance';

interface AssignUserRoleModalProps {
    show: boolean;
    onHide: () => void;
    editMode?: boolean;
    userRoleData?: any;
    // setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    // onRoleAssigned: () => void; //!refresh callback fun
}
interface IAssignUserRole{
    userId : string;
    roleId : string;
}

const initialState:IAssignUserRole = {
    userId: "",
    roleId: ""
}

const AssignUserRoleModal: React.FC<AssignUserRoleModalProps> = ({ show, onHide, editMode = false, userRoleData }) => {
    const { users, roles, userRole,getAllAssignUserRole } = useUserRoleContext(); //?refresh
    const [assignUserRole, setAssignUserRole] = useState<IAssignUserRole>(initialState);
    const [errors, setErrors] = useState<IAssignUserRole>({ userId: '', roleId: '' });

    // for edit user role
    useEffect(() => {
        if (editMode && userRoleData) {
            setAssignUserRole({
                userId: userRoleData.user_id,
                roleId: userRoleData.role_id
            });
        } else {
            setAssignUserRole(initialState);
        }
    }, [editMode, userRoleData])

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setAssignUserRole((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '' 
        }));
    }

    const handleAssignRole = async () => {
        const { userId, roleId } = assignUserRole;
        let validationErrors: IAssignUserRole = { userId: '', roleId: '' };
        if (userId === "") validationErrors.userId = 'Please select a user.';
        if (roleId === "") validationErrors.roleId = 'Please select a role.';
        setErrors(validationErrors);

        if (validationErrors.userId || validationErrors.roleId) {
            return;
        }
        
        try {
            if (editMode) {
                await axiosInstance.put(`/user-role/${userRoleData.id}`, assignUserRole);
                toast.success('User role updated successfully!');
                setAssignUserRole(initialState);
                getAllAssignUserRole();
                onHide();
                return;
            } else {
                // to check if the user already has the selected role
                const existingUserRole = userRole.find(
                    (ur) => ur.user_id === assignUserRole.userId && ur.role_id === assignUserRole.roleId
                );

                if (existingUserRole) {
                    return toast.error('This user already has the selected role!');
                }

                await axiosInstance.post('/user-role', assignUserRole);
                // console.log(response);
                toast.success('User role assigned successfully!');
                setAssignUserRole(initialState);
                getAllAssignUserRole(); //! not working 
                onHide();
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error('There was an error saving the user!');
        }
        console.log(assignUserRole);
    }

    return (
        <>
            <Modal show={show} onHide={onHide} backdrop="static" className="mt-0 custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Mode" : "Assign Role"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mt-2'>
                            <Col>
                                <Form.Group controlId="formUser" className='mb-2'>
                                    <Form.Label>FullName<span className='required-feilds'>*</span></Form.Label>
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
                                            return <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                        })}
                                    </Form.Control>
                                    {errors.userId && <span className="text-danger">{errors.userId}</span>}

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Form.Group controlId="formRole" className='mb-2'>
                                    <Form.Label>Role<span className='required-feilds'>*</span></Form.Label>
                                    <Form.Control
                                        as="select"
                                        size="sm"
                                        name="roleId"
                                        required
                                        onChange={handleChange}
                                        value={assignUserRole.roleId}
                                    >
                                        <option value="">Select Role</option>
                                        {roles && roles.map((role) => {
                                            return <option key={role.id} value={role.id}>{role.roleName}</option>
                                        })}
                                    </Form.Control>
                                    {errors.roleId && <span className="text-danger">{errors.roleId}</span>}

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
        </>
    )
}

export default AssignUserRoleModal

