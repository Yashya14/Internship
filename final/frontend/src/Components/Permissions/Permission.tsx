import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import axiosInstance from '../Axios/axiosInstance';
import { toast } from 'react-toastify';

const Permission: React.FC = () => {
    const { users } = useUserRoleContext();

    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [permissions, setPermissions] = useState<string[]>([]);

    // get user permissions when a user is selected

    const fetchUserPermissions = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            if (response.status === 200) {
                const userPermissions = response.data.permissions;
                if (userPermissions && userPermissions.length > 0) {
                    setPermissions(userPermissions);
                }
            } else {
                alert('Error fetching user permissions');
            }
        } catch (error) {
            alert('An error occurred while fetching user permissions');
            console.error(error);
        }
    };

    // Handle user selection
    const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = (e.target as HTMLSelectElement).value;
        setSelectedUserId(userId);
        if (userId) {
            fetchUserPermissions(userId);
        } else {
            setPermissions([]);
        }
    };

    // Handle checkbox change
    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPermissions((prevPermissions) => {
            if (checked) {
                return [...prevPermissions, name];
            } else {
                return prevPermissions.filter((permission) => permission !== name);
            }
        });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUserId) {
            alert('Please select a user');
            return;
        }

        console.log("permissions : ", permissions);

        try {
            const response = await axiosInstance.put(`/users/${selectedUserId}`, { permissions });
            console.log("res : ", response.data);
            if (response.status === 200) {
                toast.success('Permissions updated successfully');
                setSelectedUserId('');
                setPermissions([]);
            } else {
                alert('Error updating permissions');
            }
        } catch (error) {
            alert('Error occurred while updating permissions');
            console.error(error);
        }
    };

    // clear checkbox and selected user
    const handleClear = () => {
        setSelectedUserId('');
        setPermissions([]);
    }

    return (
        <>
            <div>
                <div className='list-container-user'>
                    <h3 className="text-2xl font-semibold ms-2">Permissions</h3>
                    <p className="text-muted mt-1 ms-2">Manage permissions for users and roles</p>
                </div>
                <div className="list-container-user">
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="userFormUser">
                                    <Form.Label>User<span className='required-feilds'>*</span></Form.Label>
                                    <Form.Control
                                        as="select"
                                        size="sm"
                                        value={selectedUserId}
                                        onChange={(e) => handleUserSelect(e as unknown as React.ChangeEvent<HTMLSelectElement>)}
                                        name="userId"
                                        required
                                    >
                                        <option value="">Select User</option>
                                        {users && users.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.firstName} {user.lastName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="userFormPermissions" className="mb-2 mt-4">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>User</th>
                                                    <td><Form.Check type="checkbox" label="Add" name="add_user" checked={permissions.includes('add_user')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="Edit" name="edit_user" checked={permissions.includes('edit_user')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="Delete" name="delete_user" checked={permissions.includes('delete_user')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="View" name="view_user" checked={permissions.includes('view_user')} onChange={handlePermissionChange} /></td>
                                                </tr>

                                                <tr>
                                                    <th>Role</th>
                                                    <td><Form.Check type="checkbox" label="Add" name="add_role" checked={permissions.includes('add_role')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="Edit" name="edit_role" checked={permissions.includes('edit_role')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="Delete" name="delete_role" checked={permissions.includes('delete_role')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="View" name="view_role" checked={permissions.includes('view_role')} onChange={handlePermissionChange} /></td>
                                                </tr>

                                                <tr>
                                                    <th>Assign Role</th>
                                                    <td><Form.Check type="checkbox" label="Add" name="assign_role" checked={permissions.includes('assign_role')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="Edit" name="edit_assign_role" checked={permissions.includes('edit_assign_role')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="Delete" name="delete_assign_role" checked={permissions.includes('delete_assign_role')} onChange={handlePermissionChange} className="me-3" /></td>
                                                    <td><Form.Check type="checkbox" label="View" name="view_assign_role" checked={permissions.includes('view_assign_role')} onChange={handlePermissionChange} /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Form.Group>
                                <Button variant="primary" size="sm" type="submit" className='me-2'>Save</Button>
                                <Button variant="danger" size="sm" onClick={handleClear}>Cancel</Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default Permission;