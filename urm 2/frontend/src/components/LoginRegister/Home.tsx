import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <>
            <Container className="text-center" fluid>
                <Row className="calc(100vh-60px)">
                    <Col md={6}>
                        <h1 className="display-5 fw-bold">Welcome to TeamSphere 🚀</h1>
                        <p className="lead">Collaborate and manage your team efficiently.</p>
                        <div className="mt-4">
                            <Link to="/">
                                <Button variant="primary" className="me-3">Login</Button>
                            </Link>
                            <Link to="/">
                                <Button variant="secondary">Sign Up</Button>
                            </Link>
                        </div>
                    </Col>

                    <Col md={6} className='d-flex justify-content-center align-items-center'>
                        <img src="/assets/login.jpg" alt="Team Collaboration" className="img-fluid" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
