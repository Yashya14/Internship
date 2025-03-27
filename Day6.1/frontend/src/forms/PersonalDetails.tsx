import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormContext } from './FormContext';

interface PersonalDetailsProps {
  nextStep: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ nextStep }) => {
  const context = useContext(FormContext);

  if (!context) {
    return null; 
  }

  const { formData, updateFormData } = context;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      nextStep();
    }
  };

  return (
    <Form>
      <Form.Group controlId="firstName">
        <Form.Label>First Name<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="lastName" className="mt-2">
        <Form.Label>Last Name<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="age" className="mt-2">
        <Form.Label>Age<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          isInvalid={!!errors.age}
          min={0}
        />
        <Form.Control.Feedback type="invalid">
          {errors.age}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="gender" className="mt-2">
        <Form.Label>Gender<span className='labelStar'>*</span></Form.Label>
        <Form.Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          isInvalid={!!errors.gender}
        >
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.gender}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" onClick={handleNext} className="mt-2 mb-1 w-sm-auto d-inline-block">
        Next
      </Button>
    </Form>
  );
};

export default PersonalDetails;