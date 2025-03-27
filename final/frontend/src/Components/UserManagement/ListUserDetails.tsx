import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import axiosInstance from '../Axios/axiosInstance.ts';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { FaSearch, FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { IUser } from './User.interface.ts';
import { MdDeleteForever, MdOutlineClear } from 'react-icons/md';
import { useUserRoleContext } from "../UserRoleContext/UserRoleContext.tsx";
import AddUserModal from './AddUserModal.tsx';
import DeleteModal from '../DeleteModal/DeleteModal.tsx';
import CenteredSpinner from '../CustomLoader/CenteredSpinner.tsx';
import { ICombine } from '../UserRoleContext/UserRoleContext.tsx';
import { customStyles } from '../CustomStyles/customStyles.ts';
import { TiUserAdd } from 'react-icons/ti';
import ExportButton from '../ExportButton/ExportExcelButton.tsx';
import { ExportPDFButton } from '../ExportButton/ExportPdfButton.tsx';
// import AddModal from './AddModal.tsx';

// to map data for csv export
const mapData = (user: ICombine) => ({
    FirstName: user.firstName,
    LastName: user.lastName,
    Username: user.username,
    Role: user.roles.map(role => role).join(', '),
    Email: user.email,
    PhoneNumber: user.phoneNumber,
    DateOfBirth: user.dateOfBirth,
    Street: user.address.street,
    City: user.address.city,
    State: user.address.state,
    Zipcode: user.address.zipcode,
    Country: user.address.country
});

const ListUserDetails: React.FC = () => {
    const { combinedData, loading, getCombinedData, getAllAssignUserRole } = useUserRoleContext();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<string>('');
    const [editUser, setEditUser] = useState<IUser | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]); // New state for selected users
    const [clearSelectedRows, setClearSelectedRows] = useState<boolean>(false); // to clear selected checkbox


    interface IUsersCellProps {
        row: ICombine;
    }

    const AddressCell: React.FC<IUsersCellProps> = ({ row }) => (
        <div style={{ flexGrow: 2 }}>
            {`${row.address.street}, ${row.address.city}, ${row.address.state}, ${row.address.zipcode}, ${row.address.country}`}
        </div>
    );

    const EmailCell: React.FC<IUsersCellProps> = ({ row }) => (
        <div style={{ flexGrow: 2 }}>
            {`${row.email}`}
        </div>
    )

    // column definition for table
    const columns: TableColumn<ICombine>[] = [
        {
            name: 'Name',
            selector: (row: ICombine) => `${row.firstName} ${row.lastName}`,
            sortable: true,

            cell: (row: ICombine) => (
                <div onClick={() => openEditUserModal(row)}>
                    <div style={{ color: 'black', fontWeight: '500' }}>{`${row.firstName} ${row.lastName}`}</div>
                    <div style={{ fontSize: 'smaller', color: '#585757' }}>{row.username}</div>
                </div>
            ),
        },
        {
            name: 'Role',
            selector: (row: ICombine) => row.roles.map((role: { roleName: string }) => role).join(', '),
            sortable: true,
        },
        {
            name: 'Email',
            cell: (row: ICombine) => <EmailCell row={row} />,
            sortable: true,

        }
        ,
        {
            name: 'Phone Number',
            selector: (row: ICombine) => row.phoneNumber,
            sortable: true,
        }
        ,
        {
            name: 'Date of Birth',
            selector: (row: ICombine) => new Date(row.dateOfBirth).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Address',
            cell: (row: ICombine) => <AddressCell row={row} />,
            sortable: true,
            // grow: 2
        }
    ];

    const openAddModal = () => {
        setEditUser(null);
        setAddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setAddModalIsOpen(false);
        getCombinedData();
        getAllAssignUserRole();
        setClearSelectedRows(!clearSelectedRows);
        setSelectedUsers([]);
    };

    const openEditModal = (user: IUser) => {
        setEditUser(user);
        setAddModalIsOpen(true);
    };

    // open when click on row
    const openEditUserModal = (row: any) => {
        setEditUser(row);
        setAddModalIsOpen(true);
    }

    // function to delete user and their assigned roles
    const handleDeleteUser = async () => {
        const ids = selectedUsers.map(user => user._id);
        try {
            for (const id of ids) {
                const user = combinedData.find(user => user._id === id);
                if (user) {
                    for (const role of user.roles) {
                        if (role.assign_id) {
                            await axiosInstance.delete(`/user-role/${role.assign_id}`);
                        }
                    }
                    await axiosInstance.delete(`/users/${id}`);
                }
            }
            toast.success('Selected users and their assigned roles deleted successfully!');
            // getCombinedData();
        } catch (error: any) {
            console.log(`error delete: ${error.message}`);
            // toast.error('There was an error deleting the users!');
        } finally {
            setModalIsOpen(false);
            setClearSelectedRows(!clearSelectedRows);
            setSelectedUsers([]);
            getCombinedData();
            getAllAssignUserRole();
        }
    };

    const openDeleteModal = () => {
        setModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setModalIsOpen(false);
        setClearSelectedRows(!clearSelectedRows);
    };

    const handleRowSelected = (state: any) => {
        setSelectedUsers(state.selectedRows);
    };


    const filteredUsers = combinedData.filter(user =>
        user.firstName.toLowerCase().includes(searchData.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchData.toLowerCase()) ||
        user.email.toLowerCase().includes(searchData.toLowerCase()) ||
        user.username.toLowerCase().includes(searchData.toLowerCase()) ||
        user.roles.join().toLowerCase().includes(searchData.toLowerCase())
    );


    // pdf coulmn data
    const columnsData = ["Name", "Role", "Email", "Phone Number", "Date of Birth", "Address"];

    // pdf rows data
    const rows = filteredUsers.map((user) => [
        `${user.firstName} ${user.lastName}`,
        user.roles.map((role) => role).join(", "),
        user.email,
        user.phoneNumber,
        user.dateOfBirth,
        `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipcode}, ${user.address.country}`,
    ]);



    return (

        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold">User Management</h3>
                <p className="text-muted mt-1 fs-6 fs-md-5 fs-lg-4 fs-7">Manage your team members and their account permissions here.</p>

                <Row className="mt-2 mb-2">
                    <Col sm={12} md={12} lg={3} xl={5} className="d-flex justify-content-between align-items-center">
                        <h5 className='fs-7'>All users <span className="text-muted">{combinedData.length}</span></h5>
                    </Col>
                    <Col sm={12} md={12} lg={9} xl={7} className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-end align-items-center">
                        <InputGroup className="w-100 w-sm-auto mb-2 mb-sm-0">
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                className="border form-control-sm form-control-md"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                            <Button
                                variant="outline-primary"
                                className="d-flex align-items-center btn-sm btn-md"
                                style={{ border: "1px solid #8080804a", cursor: "pointer" }}
                                onClick={() => setSearchData('')}

                            >
                                <MdOutlineClear />
                            </Button>
                        </InputGroup>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <div className="d-flex flex-row">
                                <Button onClick={openAddModal} variant="primary" title='Add User' className="d-flex align-items-center mx-1 btn-sm btn-md mb-2 mb-sm-0 p-1">
                                    <TiUserAdd className="me-1" style={{ fontSize: "1.2rem" }} />
                                    Add
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button
                                    variant="secondary"
                                    className="d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0 p-1"
                                    onClick={() => openEditModal(selectedUsers[0])} // Open edit modal with the first selected user
                                    disabled={selectedUsers.length !== 1} // Disable if not exactly one user is selected
                                >
                                    <FaUserEdit className="me-1" />
                                    Edit
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button
                                    onClick={openDeleteModal}
                                    variant="danger"
                                    className="d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0 p-1"
                                    disabled={selectedUsers.length === 0} // Disable button if no users are selected
                                >
                                    <MdDeleteForever className="me-1" />
                                    Delete
                                </Button>
                            </div>

                            <div className="d-flex flex-row">
                                <ExportButton data={combinedData} mapData={mapData} typeOfData="users" />
                            </div>

                            <div className='d-flex flex-row'>
                                <ExportPDFButton docText="User Information Table" columnsData={columnsData} rows={rows} docName='Users' />
                            </div>


                        </div>
                    </Col>
                </Row>
            </div>


            <DataTable
                fixedHeader
                customStyles={customStyles}
                columns={columns}
                data={filteredUsers}
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={clearSelectedRows}
                progressPending={loading}
                progressComponent={<CenteredSpinner />}
                fixedHeaderScrollHeight={"420px"}
                // onRowClicked={(row: any) => openEditUserModal(row)}
                highlightOnHover
                pagination
                dense

            />

            <AddUserModal
                show={addModalIsOpen}
                onHide={closeAddModal}
                user={editUser}

            />

            {/* <AddModal show={addModalIsOpen} onHide={closeAddModal} user={editUser} /> */}

            <DeleteModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                data={selectedUsers}
                onDelete={handleDeleteUser}
                type="user"
            />
        </div>
    );
};

export default ListUserDetails;