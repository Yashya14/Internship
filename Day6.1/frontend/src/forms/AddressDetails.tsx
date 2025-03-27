import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormContext } from './FormContext';

interface AddressDetailsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ nextStep, prevStep }) => {
  const context = useContext(FormContext);

  if (!context) {
    return null; 
  }

  const { formData, updateFormData } = context;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip) newErrors.zip = 'Zip Code is required';
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
      <Form.Group controlId="street">
        <Form.Label>Street<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Enter your street"
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type="invalid">
          {errors.street}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="city" className="mt-2">
        <Form.Label>City<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
          isInvalid={!!errors.city}
        />
        <Form.Control.Feedback type="invalid">
          {errors.city}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="state" className="mt-2">
        <Form.Label>State<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter your state"
          isInvalid={!!errors.state}
        />
        <Form.Control.Feedback type="invalid">
          {errors.state}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="zip" className="mt-2">
        <Form.Label>Zip Code<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          placeholder="Enter your zip code"
          isInvalid={!!errors.zip}
        />
        <Form.Control.Feedback type="invalid">
          {errors.zip}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="secondary" onClick={prevStep} className="mt-2 me-2 w-100 w-sm-auto">
        Back
      </Button>
      <Button variant="primary" onClick={handleNext} className="mt-2 mb-1 w-100 w-sm-auto">
        Next
      </Button>
    </Form>
  );
};

export default AddressDetails;