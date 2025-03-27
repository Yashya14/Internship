import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormContext } from './FormContext';

interface SkillsAndOtherProps {
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SkillsAndOther: React.FC<SkillsAndOtherProps> = ({ prevStep, handleSubmit }) => {
  const context = useContext(FormContext);

  if (!context) {
    return null;
  }

  const { formData, updateFormData } = context;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.skills) newErrors.skills = 'Skills are required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    return newErrors;
  };

  // submit form data
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleSubmit(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="skills">
        <Form.Label>Skills<span className='labelStar'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Enter your skills (comma-separated)"
          isInvalid={!!errors.skills}
        />
        <Form.Control.Feedback type="invalid">
          {errors.skills}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="experience" className="mt-2">
        <Form.Label>Experience<span className='labelStar'>*</span> (Years)</Form.Label>
        <Form.Control
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Enter your experience in years"
          isInvalid={!!errors.experience}
        />
        <Form.Control.Feedback type="invalid">
          {errors.experience}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="additionalInfo" className="mt-2">
        <Form.Label>Additional Information</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Enter any additional details"
        />
      </Form.Group>
      <Button variant="secondary" onClick={prevStep} className="mt-2 me-2 w-100 w-sm-auto">
        Back
      </Button>
      <Button variant="success" type="submit" className="mt-2 w-100 w-sm-auto">
        Submit
      </Button>
    </Form>
  );
};

export default SkillsAndOther;