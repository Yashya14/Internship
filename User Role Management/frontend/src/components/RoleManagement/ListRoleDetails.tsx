import React, {  useState } from 'react';
import DataTable from 'react-data-table-component';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext.tsx'
import CenteredSpinner from '../CustomLoader/CenteredSpinner.tsx';
import AddEditRoleModal from './AddEditRoleModal.tsx';
import { IRole } from './Role.interface.ts';
import axiosInstance from '../axios/axiosInstance.ts';
import { toast } from 'react-toastify';
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

const ListRoleDetails: React.FC = () => {
    const { roles, loading, getAllRoles } = useUserRoleContext();
    const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false); // open add role modal
    const [editRole, setEditRole] = useState<IRole | null>(null); // edit role data
    const [roleToDelete, setRoleToDelete] = useState<string | null>(null); // select role (i.e id)  to delete
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // open delete modal
    const [searchRoleData, setSearchRoleData] = useState<string>(''); // search data


    // useEffect(() => {
    //     getAllRoles();
    // }, []);

    // column definition for table
    const columns = [
        {
            name: 'Role Name',
            selector: (row: any) => row.roleName,
            sortable: true,

        },
        {
            name: 'Role Type',
            selector: (row: any) => row.roleType,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => row.status,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: any) => row.roleDescription,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: any) => (
                <div>
                    <Button onClick={() => openEditModal(row)} variant="link" className="me-2 px-2 pb-2 rounded-4" style={{ backgroundColor: '#80808029' }} title="Edit">
                        <FaEdit className="pb-1 fs-5" />
                    </Button>
                    <Button
                        variant="link"
                        className="text-danger rounded-4 px-2 py-1 pb-2"
                        style={{ backgroundColor: '#80808029' }}
                        title="Delete"
                        onClick={() => openDeleteModal(row.id)}
                    >
                        <MdDeleteForever className="fs-4" />
                    </Button>
                </div>
            ),
        },
    ];

    // Add role modal
    const openAddModal = () => {
        setEditRole(null);
        setAddModalIsOpen(true);
    };
    // close add role modal
    const closeAddModal = () => {
        setAddModalIsOpen(false);
    };

    // open edit role modal
    const openEditModal = (role: IRole) => {
        setEditRole(role);
        setAddModalIsOpen(true);
    };


    // delete user from api
    const handleDeleteRole = async (id: string) => {
        try {
            await axiosInstance.delete(`/roles/${id}`);
            toast.success('Role deleted successfully!');
            getAllRoles();
        } catch (error) {
            toast.error('There was an error deleting the role!');
        }
        setModalIsOpen(false);; // Close modal after deletion
    };

    // open modal for delete confirmation
    const openDeleteModal = (id: string) => {
        setRoleToDelete(id);
        setModalIsOpen(true);
    };
    // close delete modal
    const closeDeleteModal = () => {
        setModalIsOpen(false);
    };

    const roleToDeleteData = roles.find(role => role.id === roleToDelete);

     // filter role based on search data
     const filteredRoles = roles.filter(role =>
        role.roleName.toLowerCase().includes(searchRoleData.toLowerCase()) ||
        role.status.toLowerCase().includes(searchRoleData.toLowerCase()) ||
        role.roleType.toLowerCase().includes(searchRoleData.toLowerCase())
    );

    return (
        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold">Role Management</h3>
                <p className="text-muted mt-1">Manage roles to control user access and permissions.</p>

                <Row className="mt-2 mb-2">
                    <Col xs={12} sm={3} md={3} lg={6} xl={7} className="d-flex justify-content-between align-items-center">
                        <h5>All roles <span className="text-muted">{roles.length}</span></h5>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={6} xl={5} className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-end align-items-center">
                        <InputGroup className="me-2 w-100 w-sm-auto mb-2 mb-sm-0">
                            <FormControl
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                className="border form-control-sm form-control-md"
                                value={searchRoleData}
                                onChange={(e) => setSearchRoleData(e.target.value)}
                            />
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                        <div className="d-flex flex-row">
                            <Button onClick={openAddModal} variant="primary" className="d-flex align-items-center me-2 btn-sm btn-md mb-2 mb-sm-0">
                                <FaPlus className="me-2" />
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <DataTable fixedHeader customStyles={customStyles} columns={columns} data={filteredRoles} progressPending={loading} progressComponent={<CenteredSpinner />} fixedHeaderScrollHeight={"400px"} highlightOnHover pagination />

            <AddEditRoleModal show={addModalIsOpen} onHide={closeAddModal} role={editRole} />
            
            <DeleteModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                data={roleToDeleteData}  // Pass the role object
                onDelete={handleDeleteRole}
                type="role"
            />


        </div>
    );
};

export default ListRoleDetails;
