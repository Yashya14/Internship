import DataTable from 'react-data-table-component';
import { InputGroup, FormControl, Col, Row, Button } from 'react-bootstrap';
import { FaPlus, FaSearch, FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever, MdOutlineClear } from 'react-icons/md';
import AssignUserRoleModal from './AssignUserRoleModal';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import { IAssignUserRole } from './AssignUserRole.interface';
import React, { useState } from 'react';
import CenteredSpinner from '../CustomLoader/CenteredSpinner';
import { toast } from 'react-toastify';
import axiosInstance from '../Axios/axiosInstance';
import DeleteModal from '../DeleteModal/DeleteModal';
import { customStyles } from '../CustomStyles/customStyles';

const ListAssignUserRoleComponent: React.FC = () => {
    const { userRole, loading, getAllAssignUserRole, getCombinedData } = useUserRoleContext();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false); // open delete modal
    const [editMode, setEditMode] = useState(false); // for edit userrole
    const [selectedUserRole, setSelectedUserRole] = useState<IAssignUserRole | null>(null); // select userrole to edit
    const [searchUserRole, setSearchUserRole] = useState<string>(''); // search user role
    const [selectedRoles, setSelectedRoles] = useState<IAssignUserRole[]>([]); // state for selected roles
    const [clearSelectedRows, setClearSelectedRows] = useState<boolean>(false); // state to clear selected roles

    // column definition for table
    const columns = [
        {
            name: 'FullName',
            selector: (row: any) => `${row.firstName} ${row.lastName}`,
            sortable: true,
            cell: (row: IAssignUserRole) => (
                <div onClick={() => handleEditUserRole(row)} style={{ cursor: 'pointer' }}>
                    <div style={{ color: 'black', fontWeight: '500' }}>{`${row.firstName} ${row.lastName}`}</div>
                </div>
            ),
        },
        {
            name: 'Roles',
            selector: (row: IAssignUserRole) => row.roleNames.join(', '), // Display role names as a comma-separated string
            sortable: true,
        }
    ];

    const handleDelete = async () => {
        const ids = selectedRoles.map(role => role._id);
        try {
            await Promise.all(ids.map(id => axiosInstance.delete(`/user-role/${id}`)));
            toast.success('Selected roles deleted successfully!');
            getAllAssignUserRole(); //! not working
            getCombinedData(); //! Fetch combined data after deletion
        } catch (error) {
            toast.error('There was an error deleting the roles!');
        } finally {
            setDeleteModal(false);
            setSelectedRoles([]);
            setClearSelectedRows(!clearSelectedRows);
        }
    };

    // for assign role to user
    const handleOpenModal = () => {
        setEditMode(false); // set edit mode to false
        setSelectedUserRole(null); // set selected user role to null
        setModalIsOpen(true); // open modal to assign userrole
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedRoles([]); //! Clear selected roles 24/02/25
    };

    //* edit user role
    const handleEditUserRole = (userRole: IAssignUserRole) => {
        setEditMode(true); // set edit mode to true
        setSelectedUserRole(userRole); // set selected user role to edit
        setModalIsOpen(true); // open modal to assign userrole
        setClearSelectedRows(!clearSelectedRows); // Clear selected rows

    }

    //? open modal for delete confirmation
    const openDeleteModal = () => {
        setDeleteModal(true);
    };

    //? close delete modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setClearSelectedRows(!clearSelectedRows); // Clear selected rows
    };

    const handleRowSelected = (state: any) => {
        setSelectedRoles(state.selectedRows);
    };

    // filter users based on search data //! here filter combinedData
    const filteredUserRole = userRole.filter((role) => {
        return (
            (role.firstName && role.firstName.toLowerCase().includes(searchUserRole.toLowerCase())) ||
            (role.lastName && role.lastName.toLowerCase().includes(searchUserRole.toLowerCase())) ||
            (Array.isArray(role.roleNames) && role.roleNames.join(', ').toLowerCase().includes(searchUserRole.toLowerCase()))
        );
    });


    return (
        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold">Assign Role to User</h3>
                <p className="text-muted mt-1">Designate a role for the user to control their privileges.</p>

                <Row className="mt-2 mb-2">
                    <Col sm={12} md={12} lg={4} xl={5} className="d-flex justify-content-between align-items-center">
                        {/* <h5>All assign roles <span className="text-muted">{userRole ? userRole.length : 0}</span></h5> */}
                    </Col>
                    <Col sm={12} md={12} lg={8} xl={7} className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-end align-items-center">
                        <InputGroup className="w-100 w-sm-auto mb-2 mb-sm-0">
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                className="border form-control-sm form-control-md"
                                value={searchUserRole}
                                onChange={(e) => setSearchUserRole(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                className="d-flex align-items-center btn-sm btn-md"
                                style={{ border: "1px solid #8080804a", cursor: "pointer" }}
                                onClick={() => setSearchUserRole('')}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <MdOutlineClear />
                            </Button>

                        </InputGroup>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <div className="d-flex flex-row">
                                <Button onClick={handleOpenModal} variant="primary" className="d-flex align-items-center mx-1 btn-sm btn-md mb-2 mb-sm-0">
                                    <FaPlus className="me-1" />
                                    Add
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button
                                    variant="secondary"
                                    className="d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0"
                                    onClick={() => handleEditUserRole(selectedRoles[0])} // Open edit modal with the first selected role
                                    disabled={selectedRoles.length !== 1} // Disable if not exactly one role is selected
                                >
                                    <FaUserEdit className="me-1" />
                                    Edit
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button
                                    variant="danger"
                                    className="d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0"
                                    onClick={openDeleteModal} // Open delete modal
                                    disabled={selectedRoles.length === 0} // Disable button if no roles are selected
                                >
                                    <MdDeleteForever className="me-1" />
                                    Delete
                                </Button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>

            <DataTable
                fixedHeader
                customStyles={customStyles}
                columns={columns}
                data={filteredUserRole}
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={clearSelectedRows} // Add clearSelectedRows prop
                progressPending={loading}
                progressComponent={<CenteredSpinner />}
                fixedHeaderScrollHeight={"400px"}
                highlightOnHover
                pagination
                dense
            />

            <AssignUserRoleModal
                show={modalIsOpen}
                onHide={handleCloseModal}
                editMode={editMode}
                userRoleData={selectedUserRole}
            />

            {/* to delete Assign User Role */}
            <DeleteModal
                show={deleteModal}
                onHide={closeDeleteModal}
                data={selectedRoles}  // Pass the selected roles
                onDelete={handleDelete}
                type="userRole"
            />
        </div>
    );
};

export default ListAssignUserRoleComponent;