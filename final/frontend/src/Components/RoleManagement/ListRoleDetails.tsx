import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { FaSearch, FaPlus, FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever, MdOutlineClear } from 'react-icons/md';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext.tsx'
import CenteredSpinner from '../CustomLoader/CenteredSpinner.tsx';
import AddEditRoleModal from './AddEditRoleModal.tsx';
import { IRole } from './Role.interface.ts';
import axiosInstance from '../Axios/axiosInstance.ts';
import { toast } from 'react-toastify';
import DeleteModal from '../DeleteModal/DeleteModal.tsx';
import { customStyles } from '../CustomStyles/customStyles.ts';
import ExportButton from '../ExportButton/ExportExcelButton.tsx';
import { ExportPDFButton } from '../ExportButton/ExportPdfButton.tsx';


// to map data for csv export
const mapData = (role: IRole) => ({
    RoleName: role.roleName,
    RoleType: role.roleType,
    Status: role.status,
    Description: role.roleDescription
});

const ListRoleDetails: React.FC = () => {
    const { roles, loading, getAllRoles } = useUserRoleContext();
    const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false); // open add role modal
    const [editRole, setEditRole] = useState<IRole | null>(null); // edit role data
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // open delete modal
    const [searchRoleData, setSearchRoleData] = useState<string>(''); // search data
    const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]); // state for selected roles
    const [clearSelectedRows, setClearSelectedRows] = useState<boolean>(false);

    // column definition for table
    const columns = [
        {
            name: 'Role Name',
            selector: (row: any) => row.roleName,
            sortable: true,
            cell: (row: any) => (
                <div onClick={() => openEditModal(row)} style={{ cursor: 'pointer' }}>
                    {row.roleName}
                </div>
            ),
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
            grow: 2
        }
    ];

    // Add role modal
    const openAddModal = () => {
        setEditRole(null);
        setAddModalIsOpen(true);
    };

    // close add role modal
    const closeAddModal = () => {
        setAddModalIsOpen(false);
        setClearSelectedRows(!clearSelectedRows); // toggle clearSelectedRows to clear selected rows
        setSelectedRoles([]); // Uncheck selected box after adding the role
    };

    // open edit role modal
    const openEditModal = (role: IRole) => {
        setEditRole(role);
        setAddModalIsOpen(true);
    };

    // open delete role modal
    const openDeleteModal = () => {
        setModalIsOpen(true);
    };

    // close delete role modal
    const closeDeleteModal = () => {
        setModalIsOpen(false);
        setClearSelectedRows(!clearSelectedRows); // Toggle clearSelectedRows to reset selected rows

    };

    // delete role from api
    const handleDeleteRole = async () => {
        const ids = selectedRoles.map(role => role._id);
        try {
            await Promise.all(ids.map(id => axiosInstance.delete(`/roles/${id}`)));
            toast.success('Selected roles deleted successfully!');
            getAllRoles();
        } catch (error) {
            toast.error('There was an error deleting the roles!');
        } finally {
            setModalIsOpen(false);
            setSelectedRoles([]); // Uncheck selected box after deleting the roles
            setClearSelectedRows(!clearSelectedRows); // Toggle clearSelectedRows to reset selected rows

        }
    };

    const handleRowSelected = (state: any) => {
        setSelectedRoles(state.selectedRows);
    };

    // filter role based on search data
    const filteredRoles = roles.filter(role =>
        role.roleName.toLowerCase().includes(searchRoleData.toLowerCase()) ||
        role.status.toLowerCase().includes(searchRoleData.toLowerCase()) ||
        role.roleType.toLowerCase().includes(searchRoleData.toLowerCase())
    );

    // pdf columns data
    const columnsData = [
        "RoleName",
        "Status",
        "RoleType",
        "Role Description",
    ];

    // pdf rows data
    const rows = roles.map((role: any) => [
        role.roleName, // Check if roles exist
        role.status,
        role.roleType,
        role.roleDescription,
    ]);

    return (
        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold">Role Management</h3>
                <p className="text-muted mt-1">Manage roles to control user access and permissions.</p>

                <Row className="mt-2 mb-2">
                    <Col sm={12} md={12} lg={3} xl={5} className="d-flex justify-content-between align-items-center">
                        <h5>All roles <span className="text-muted">{roles.length}</span></h5>
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
                                value={searchRoleData}
                                onChange={(e) => setSearchRoleData(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                className="d-flex align-items-center btn-sm btn-md"
                                style={{ border: "1px solid #8080804a", cursor: "pointer" }}
                                onClick={() => setSearchRoleData('')}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <MdOutlineClear />
                            </Button>
                        </InputGroup>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <div className="d-flex flex-row">
                                <Button onClick={openAddModal} variant="primary" className="d-flex align-items-center mx-1 btn-sm btn-md mb-2 mb-sm-0 p-1">
                                    <FaPlus className="me-1" />
                                    Add
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button
                                    variant="secondary"
                                    className="d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0 p-1"
                                    onClick={() => openEditModal(selectedRoles[0])} // Open edit modal with the first selected role
                                    disabled={selectedRoles.length !== 1} // Disable if not exactly one role is selected
                                >
                                    <FaUserEdit className="me-1" />
                                    Edit
                                </Button>
                            </div>
                            <div className="d-flex flex-row">
                                <Button
                                    variant="danger"
                                    className="d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0 p-1"
                                    onClick={openDeleteModal} // Open delete modal
                                    disabled={selectedRoles.length === 0} // Disable button if no roles are selected
                                >
                                    <MdDeleteForever className="me-1" />
                                    Delete
                                </Button>
                            </div>

                            <div className="d-flex flex-row">
                                <ExportButton data={roles} mapData={mapData} typeOfData='Roles' />
                            </div>
                            <div className="d-flex flex-row">
                                <ExportPDFButton docText="Role Information Table" columnsData={columnsData} rows={rows} docName='Roles' />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <DataTable
                fixedHeader
                customStyles={customStyles}
                columns={columns}
                data={filteredRoles}
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={clearSelectedRows}
                progressPending={loading}
                progressComponent={<CenteredSpinner />}
                fixedHeaderScrollHeight={"400px"}
                highlightOnHover
                pagination
                dense
            />

            <AddEditRoleModal
                show={addModalIsOpen}
                onHide={closeAddModal}
                role={editRole}
            // onRoleUpdated={() => {
            //     setSelectedRoles([]); // Uncheck selected box after updating the role
            //     setClearSelectedRows(!clearSelectedRows); // Toggle clearSelectedRows to reset selected rows
            //     getAllRoles();
            // }}
            />

            <DeleteModal
                show={modalIsOpen}
                onHide={closeDeleteModal}
                data={selectedRoles}  // Pass the selected roles
                onDelete={handleDeleteRole}
                type="role"
            />
        </div>
    );
};

export default ListRoleDetails;