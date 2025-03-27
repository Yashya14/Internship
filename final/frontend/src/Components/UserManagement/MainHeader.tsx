import React from 'react'
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { FaSearch, FaUserEdit } from 'react-icons/fa'
import { MdOutlineClear, MdDeleteForever } from 'react-icons/md'
import { TiUserAdd } from 'react-icons/ti'
import ExportButton from '../ExportButton/ExportExcelButton'
import { ExportPDFButton } from '../ExportButton/ExportPdfButton'

const MainHeader: React.FC = ({ combinedData, searchData, setSearchData, openAddModal, openEditModal, openDeleteModal, selectedUsers, mapData, columnsData, rows }: any) => {
    return (
        <>
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
        </>
    )
}

export default MainHeader