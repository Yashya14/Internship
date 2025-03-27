import React, { useState } from "react";
import axios from "axios";
import { IEmployee } from "./Employee.type";

const initialFormData: IEmployee = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
};

const MultiStepForm: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [formData, setFormData] = useState<IEmployee>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
    } else if (step === 2) {
      if (!formData.street) newErrors.street = "Street is required";
      if (!formData.city) newErrors.city = "City is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (validate(selectedStep)) {
      if (selectedStep < 2) setSelectedStep(selectedStep + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedStep > 1) setSelectedStep(selectedStep - 1);
  };

  const handleSubmitForm = async () => {
    if (validate(selectedStep)) {
      try {
        const response = await axios.post("http://localhost:8000/user", formData);
        if (response.status === 200) {
          console.log(response.data);
          setFormData(initialFormData);
          console.log("Form submitted successfully");
        } else {
          console.error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-md font-sans">
      <div role="tablist" className="flex space-x-4 mb-6">
        <input
          type="radio"
          name="steps"
          id="step1"
          role="tab"
          className="hidden"
          checked={selectedStep === 1}
          onChange={() => setSelectedStep(1)}
        />
        <label
          htmlFor="step1"
          className={`cursor-pointer px-4 py-2 border-b-2 ${selectedStep === 1 ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"
            }`}
        >
          Personal Details
        </label>

        <input
          type="radio"
          name="steps"
          id="step2"
          role="tab"
          className="hidden"
          checked={selectedStep === 2}
          onChange={() => setSelectedStep(2)}
        />
        <label
          htmlFor="step2"
          className={`cursor-pointer px-4 py-2 border-b-2 ${selectedStep === 2 ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"
            }`}
        >
          Address
        </label>
      </div>

      <div role="tabpanel">
        {selectedStep === 1 && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 mt-4">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </form>
          </div>
        )}

        {selectedStep === 2 && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 mt-4">
            <form>
              <div className="mb-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <button
                type="button"
                onClick={handleSubmitForm}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Finish
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
          disabled={selectedStep === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={selectedStep === 2}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;