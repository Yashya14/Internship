import DataTable from 'react-data-table-component';
import { InputGroup, FormControl, Col, Row, Button } from 'react-bootstrap';
import { FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import AssignUserRoleModal from './AssignUserRoleModal.tsx';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext.tsx';
import { IAssignUserRole } from './AssignUserRole.interface.ts'
import React, { useState } from 'react';
import CenteredSpinner from '../CustomLoader/CenteredSpinner.tsx';
import { toast } from 'react-toastify';
import axiosInstance from '../axios/axiosInstance.ts';
import DeleteModal from '../deleteModal/DeleteModal.tsx';


// style for table
const customStyles = {
    header: {
        style: {
            minHeight: '20px !important',
        },
    },
    headCells: {
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: '#eeecec',
            color: '#000000',

        }
    },
}

const AssignUserRoleComponent: React.FC = () => {
    const { userRole, loading, getAllAssignUserRole } = useUserRoleContext();
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
    const [deleteModal,setDeleteModal] = useState<boolean>(false); // open delete modal
    const [userRoleToDelete, setUserRoleToDelete] = useState<string | null>(null); // set deleted user role
    const [editMode, setEditMode] = useState<boolean>(false); // for edit userrole
    const [selectedUserRole, setSelectedUserRole] = useState<IAssignUserRole | null>(null); // slect userrole to edit
    const [searchUserRole, setSearchUserRole] = useState<string>(''); // search user role
    const [clearRows, setClearRows] = useState<boolean>(false); // state to clear selected rows

    // column definition for table
    const columns = [
        {
            name: 'FullName',
            selector: (row: any) => `${row.firstName} ${row.lastName}`,
            sortable: true,
            cell: (row: IAssignUserRole) => (
                <div>
                    <div style={{ color: 'black', fontWeight: '500' }}>{`${row.firstName} ${row.lastName}`}</div>
                </div>
            ),
        },
        {
            name: 'Role',
            selector: (row: IAssignUserRole) => row.roleName,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row : IAssignUserRole) => (
                <div>
                    <Button onClick={() => handleEditUserRole(row)} variant="link" className="me-2 px-2 pb-2 rounded-4" style={{ backgroundColor: '#80808029' }} title="Edit">
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

    const handleDelete = async(id: string) => {
        // Add your delete logic here
        try{
            const roleToDelete = userRole.find((role) => role.id === id);
            if (!roleToDelete) {
               return toast.error('Id not found');
            }
            
            await axiosInstance.delete(`/user-role/${id}`);
            // console.log(response);
            getAllAssignUserRole();
            setDeleteModal(false);
            setClearRows(!clearRows);
        }catch(error){
            console.log("Error deleting assignrole ",error);
        }

        console.log(`Delete user role with id: ${id}`);
    };

    // for assign role to user
    const handleOpenModal = () => {
        setEditMode(false); // set edit mode to false
        setSelectedUserRole(null); // set selected user role to null
        setModalIsOpen(true); // open modal to assign userrole
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    //* edit user role
    const handleEditUserRole = (userRole: IAssignUserRole) => {
        setEditMode(true); // set edit mode to true
        setSelectedUserRole(userRole); // set selected user role to edit
        setModalIsOpen(true); // open modal to assign userrole
        setClearRows(!clearRows);
    }

    //? open modal for delete confirmation
    const openDeleteModal = (id: string) => {
        setUserRoleToDelete(id);
        setDeleteModal(true);
    };
    //? close delete modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    // check if the role to delete exists
    const userRoleDelete = userRole.find(ur => ur.id === userRoleToDelete);

     // filter users based on search data //! here filter combinedData
    const filteredUserRole = userRole.filter((role) => {
        return (
            role.firstName.toLowerCase().includes(searchUserRole.toLowerCase()) ||
            role.lastName.toLowerCase().includes(searchUserRole.toLowerCase()) ||
            role.roleName.toLowerCase().includes(searchUserRole.toLowerCase())
        );
    });

    return (
        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold">Assign Role to User</h3>
                <p className="text-muted mt-1">Designate a role for the user to control their privileges.</p>

                <Row className="mt-2 mb-2">
                    <Col xs={12} sm={3} md={3} lg={6} xl={7} className="d-flex justify-content-between align-items-center">
                        <h5>All roles <span className="text-muted">{ userRole.length }</span></h5>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={6} xl={5} className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-end align-items-center">
                        <InputGroup className="me-2 w-100 w-sm-auto mb-2 mb-sm-0">
                            <FormControl
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                className="border form-control-sm form-control-md"
                                value={searchUserRole}
                                onChange={(e) => setSearchUserRole(e.target.value)}
                            />
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                        <div className="d-flex flex-row">
                            <Button onClick={handleOpenModal} variant="primary" className="d-flex align-items-center me-2 btn-sm btn-md mb-2 mb-sm-0">
                                <FaPlus className="me-2" />
                                Assign Role
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <DataTable columns={columns} data={filteredUserRole} fixedHeader customStyles={customStyles} progressPending={loading} progressComponent={<CenteredSpinner />} fixedHeaderScrollHeight={"400px"} highlightOnHover pagination clearSelectedRows={clearRows}  />

            <AssignUserRoleModal show={modalIsOpen} onHide={handleCloseModal} editMode={editMode} userRoleData={selectedUserRole} />

            {/* to delete Assign User Role */}
            <DeleteModal
                show={deleteModal}
                onHide={closeDeleteModal}
                data={userRoleDelete}  // Pass the role object
                onDelete={handleDelete}
                type="userRole"
            />
        </div>
    );
};

export default AssignUserRoleComponent;
