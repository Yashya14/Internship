// ListUserDetails.tsx
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import axiosInstance from '../axios/axiosInstance.ts';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { IUser } from './User.interface.ts';
// import DeleteUserModal from './DeleteUserModal.tsx';
import { MdDeleteForever } from 'react-icons/md';
import { useUserRoleContext } from "../UserRoleContext/UserRoleContext.tsx";
import AddUserModal from './AddUserModal.tsx';
// import { FadeLoader } from 'react-spinners';
import DeleteModal from '../deleteModal/DeleteModal.tsx';
import CenteredSpinner from '../CustomLoader/CenteredSpinner.tsx';
import { ICombine } from '../UserRoleContext/UserRoleContext.tsx' //! combined data interface

// style for table
const customStyles = {
    headCells: {
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: '#eeecec',
            color: '#000000',
        }
    }
}


const ListUserDetails: React.FC = () => {
    const { combinedData, users, loading, getCombinedData } = useUserRoleContext(); //?refresh
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // open delete modal
    const [userToDelete, setUserToDelete] = useState<string | null>(null); // select user (i.e id)  to delete
    const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false); // open add user modal
    const [searchData, setSearchData] = useState<string>(''); // search data
    const [editUser, setEditUser] = useState<IUser | null>(null); // edit user data


    // column definition for table
    const columns = [
        {
            name: 'Name',
            selector: (row: ICombine) => `${row.firstName} ${row.lastName}`,
            sortable: true,
            cell: (row: ICombine) => (
                <div>
                    <div style={{ color: 'black', fontWeight: '500' }}>{`${row.firstName} ${row.lastName}`}</div>
                    <div style={{ fontSize: 'smaller', color: '#585757' }}>{row.username}</div>
                </div>
            ),
        },
        {
            //! combine role name
            name: 'Role',
            selector: (row: ICombine) => row.roles.map((role: { roleName: string }) => role.roleName).join(', '),
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: ICombine) => row.email,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: ICombine) => (
                <div>
                    <Button onClick={() => openEditModal(row)} variant="link" className="me-2 px-2 pb-2 rounded-4" style={{ backgroundColor: '#80808029' }} title="Edit">
                        <FaEdit className="pb-1 fs-5" />
                    </Button>
                    <Button
                        onClick={() => openDeleteModal(row.id)}
                        variant="link"
                        className="text-danger rounded-4 px-2 py-1 pb-2"
                        style={{ backgroundColor: '#80808029' }}
                        title="Delete"
                    >
                        <MdDeleteForever className="fs-4" />
                    </Button>
                </div>
            ),
        },
    ];

    //? Add user modal
    const openAddModal = () => {
        setEditUser(null);
        setAddModalIsOpen(true);
    };
    // close add user modal
    const closeAddModal = () => {
        setAddModalIsOpen(false);
    };

    // open edit user modal
    const openEditModal = (user: IUser) => {
        setEditUser(user);
        setAddModalIsOpen(true);
    };

    // useEffect(() => {
    //     getAllUsers();
    // }, []);


    // delete user 
    const handleDeleteUser = async (id: string) => {
        try {
            const user = combinedData.find(user => user.id === id);
            if (user) {
                // Delete the user's assigned roles
                for (const role of user.roles) {
                    if (role.assign_id) {
                        await axiosInstance.delete(`/user-role/${role.assign_id}`);
                    }
                }
                // getAllAssignUserRole();
                // Delete the user
                try {
                    await axiosInstance.delete(`/users/${id}`);
                    toast.success('User and assigned roles deleted successfully!');
                    getCombinedData();
                    // getAllUsers();
                } catch (error: any) {
                    console.log(`error delete: ${error.message}`)
                    toast.error('There was an error deleting the user!');
                }
            } else {
                toast.error('User not found!');
            }
        } catch (error: any) {
            console.log(`error 2 catch: ${error.message}`)
            toast.error('There was an error deleting the user!');
        } finally {
            setModalIsOpen(false);
        }
    };

    // open modal for delete confirmation
    const openDeleteModal = (id: string) => {
        setUserToDelete(id);
        setModalIsOpen(true);
    };
    // close delete modal
    const closeDeleteModal = () => {
        setModalIsOpen(false);
    };

    // filter user to delete
    const userToDeleteData = users.find(user => user.id === userToDelete);

    // filter users based on search data //! here filter combinedData
    const filteredUsers = combinedData.filter(user =>
        user.firstName.toLowerCase().includes(searchData.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchData.toLowerCase()) ||
        user.email.toLowerCase().includes(searchData.toLowerCase()) ||
        user.username.toLowerCase().includes(searchData.toLowerCase()) ||
        user.roles.join().toLowerCase().includes(searchData.toLowerCase())
    );


    return (
        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold">User Management</h3>
                <p className="text-muted mt-1 fs-6 fs-md-5 fs-lg-4 fs-7">Manage your team members and their account permissions here.</p>
                
                <Row className="mt-2 mb-2">
                    <Col sm={12} md={12} lg={4} xl={5} className="d-flex justify-content-between align-items-center">
                        <h5 className='fs-7'>All users <span className="text-muted">{combinedData.length}</span></h5>
                    </Col>
                    <Col sm={12} md={12} lg={8} xl={7} className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-end align-items-center">
                        <InputGroup className="me-2 w-100 w-sm-auto mb-2 mb-sm-0">
                            <FormControl
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                className="border form-control-sm form-control-md"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <div className="d-flex flex-row">
                                <Button variant="secondary" className="d-flex align-items-center me-2 btn-sm btn-md mb-2 mb-sm-0">
                                    <FaUserEdit className="me-2" />
                                    Edit
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button variant="danger" className="d-flex align-items-center me-2 btn-sm btn-md mb-2 mb-sm-0">
                                    <MdDeleteForever className="me-2" />
                                    Delete
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button onClick={openAddModal} variant="primary" className="d-flex align-items-center me-2 btn-sm btn-md mb-2 mb-sm-0">
                                    <FaPlus className="me-2" />
                                    Add
                                </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>

            <DataTable fixedHeader customStyles={customStyles} columns={columns} data={filteredUsers} selectableRows progressPending={loading} progressComponent={<CenteredSpinner />} fixedHeaderScrollHeight={"400px"} highlightOnHover pagination />

            {/* Delete Confirmation Modal */}
            {/* <BootstrapModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                centered
                backdrop="static"
                keyboard={false}
            >
                <BootstrapModal.Header>
                    <BootstrapModal.Title>Confirm Deletion</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>
                    <p>Are you sure you want to delete this user? </p>
                    <div className='d-flex justify-content-end'>
                        <Button variant="secondary" onClick={closeDeleteModal} className='m-2'>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteUser(userToDelete!)} className='m-2'>Delete</Button>
                    </div>
                </BootstrapModal.Body>
            </BootstrapModal> */}

            {/* Use DeleteUserModal Component */}
            {/* <DeleteUserModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                userToDelete={userToDelete}
                onDelete={handleDeleteUser}
                data={userToDeleteData!}
            /> */}

            {/* <DeleteModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                userToDelete={userToDelete}  // Or just pass user data as `data`
                data={userToDeleteData!}  // Pass the user object to the `data` prop
                onDelete={handleDeleteUser}
                type="user"  // Set type as 'user'
            /> */}

            {/* Add User Modal */}
            <AddUserModal
                show={addModalIsOpen}
                onHide={closeAddModal}
                user={editUser}
            // onUserAdded={getCombinedData} // Pass the callback function
            />

            <DeleteModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                data={userToDeleteData}  // Pass the role object
                onDelete={handleDeleteUser}
                type="user"
            />
        </div>
    );
};

export default ListUserDetails;


