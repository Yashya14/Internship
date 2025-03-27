import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginImg from '/assets/loginpage.webp';
import Login from './Login';



interface CommonLayoutProps {
    onLogin: () => void;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ onLogin }) => {


    return (
        <>
            <div className="d-flex flex-md-row ms-5 mt-2">
                <h1 className='text-primary text-bold mt-2 mt-md-0'>TeamSphere</h1>
            </div>
            <Container className="d-flex align-items-center justify-content-center min-vh-90 mt-5">
                <Row className="w-100">
                    <Col md={6} lg={5} className="mx-auto d-flex align-items-center justify-content-center">
                        <img src={LoginImg} alt='loginimg' className="img-fluid" />
                    </Col>
                    <Col md={6} lg={5} className="mx-auto py-5 ">
                        <Login onLogin={onLogin} />
                    </Col>
                </Row >
            </Container >
        </>
    );
};

export default CommonLayout;