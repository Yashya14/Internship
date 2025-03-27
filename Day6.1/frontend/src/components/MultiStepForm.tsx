import React, { useState, useContext } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { PersonalDetails, AddressDetails, SkillsAndOther } from '../forms/index';
import { FormContext } from '../forms/FormContext';
import './MultiStepForm.css';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const context = useContext(FormContext);

  if (!context) {
    return null;
  }

  const { formData,addEmployee } = context;

  // Update the current step based on tab selection
  const handleTabSelect = (selectedTab: string | null) => {
    if (selectedTab) {
      setStep(Number(selectedTab)); 
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalDetails nextStep={() => setStep(2)} />;
      case 2:
        return (
          <AddressDetails
            nextStep={() => setStep(3)}
            prevStep={() => setStep(1)}
          />
        );
      case 3:
        return (
          <SkillsAndOther
            prevStep={() => setStep(2)}
            handleSubmit={(e) => {
              e.preventDefault();
              addEmployee(formData);
              console.log('Form submitted successfully!');
              console.log(formData);
              alert('Form submitted successfully!');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Row className="multi-step-form my-4 mx-2 py-2">
        <Col md={12}>
          <h2 className="text-center pb-2">Employee Registration Form</h2>
          {/* Tabs */}
          <Tabs
            activeKey={step}
            onSelect={handleTabSelect}
            className="mb-3"
            justify
          >
            <Tab eventKey={1} title="Personal Details" />
            <Tab eventKey={2} title="Address Details" />
            <Tab eventKey={3} title="Skills & Other Info" />
          </Tabs>
          {/* rednder step form */}
          {renderStep()}
        </Col>
      </Row>
    </Container>
  );
};

export default MultiStepForm;
