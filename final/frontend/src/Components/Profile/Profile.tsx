import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
// import { FaEdit } from 'react-icons/fa';
// import ProfileImg from "/assets/profile.webp";
import "./Profile.css";


const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Profile: React.FC = () => {
    const { profileData, } = useUserRoleContext();


    // console.log("role   ", role)
    return (
        <Container className="mt-4 mb-4">
            {profileData ? (
                <Card className="shadow-lg border-0 rounded-lg">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white rounded-top p-3">
                        <span className="h5">Profile Details</span>
                        {/* <Button variant="outline-light" size="sm" onClick={handleEditClick}>
                            <FaEdit className='me-1' /> Edit
                        </Button> */}

                    </Card.Header>
                    <Card.Body className="p-4 ">
                        <Row>
                            <Col md={4} className="d-flex justify-content-center align-items-start mb-4 mb-md-0">
                                <div className="profile-image-wrapper">
                                    <img
                                        src={profileData.profileImage}
                                        alt="Profile"
                                        className="profile-image"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                            </Col>

                            <Col md={8}>
                                <Row>
                                    {Object.keys(profileData)
                                        .filter((key) => key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'address' && key !== 'permissions')
                                        .map((key) => (
                                            <ListGroup.Item key={key} className="border-0">
                                                <Row>
                                                    <Col md={6}>
                                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong>
                                                    </Col>
                                                    <Col md={6}>
                                                        {key === 'dateOfBirth'
                                                            ? formatDate(profileData[key])
                                                            : profileData[key]}
                                                    </Col>
                                                </Row>

                                            </ListGroup.Item>
                                        ))}

                                    {profileData.address && (
                                        <ListGroup.Item key="address" className="border-0">
                                            <h5 className="mt-3">Address</h5>

                                            {Object.keys(profileData.address).map((addressKey) => (
                                                <ListGroup.Item key={addressKey} className="border-0">
                                                    <Row>
                                                        <Col md={6}>
                                                            <strong>{addressKey.charAt(0).toUpperCase() + addressKey.slice(1)}:</strong>
                                                        </Col>
                                                        <Col md={6}>
                                                            {profileData.address[addressKey]}
                                                        </Col>
                                                    </Row>

                                                </ListGroup.Item>
                                            ))}

                                        </ListGroup.Item>
                                    )}
                                </Row>
                            </Col>


                        </Row>
                    </Card.Body>
                </Card>
            ) : (
                <div className="text-center text-muted">No profile data available.</div>
            )}


        </Container>
    );
};

export default Profile;
