import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  age: number | string;
  gender: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  skills: string;
  experience: number;
  additionalInfo: string;
}

interface FormContextProps {
  formData: FormData;
  updateFormData: (name: string, value: string | number) => void;
  employees: FormData[];
  addEmployee: (employee: FormData) => void;
}

// create context 
export const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    skills: '',
    experience: 0,
    additionalInfo: '',
  });

  // store form data
  const [employees, setEmployees] = useState<FormData[]>([]);


  const updateFormData = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEmployee = (employee: FormData) => {
    setEmployees((prev) => {
      const updatedEmployees = [...prev, employee];
      console.log(updatedEmployees);
      return updatedEmployees;
    });
  };


  return (
    <FormContext.Provider value={{ formData, updateFormData,employees, addEmployee}}>
      {children}
    </FormContext.Provider>
  );
};