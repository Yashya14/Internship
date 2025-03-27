import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
// import { Container, Row, Col } from 'react-bootstrap';
import { FormContext } from '../forms/FormContext';

const columns = [
  {
    name: 'First Name',
    selector: (row: { firstName: string }) => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: { lastName: string }) => row.lastName,
    sortable: true,
  },
  {
    name: 'Age',
    selector: (row: { age: number | string }) => row.age,
    sortable: true,
  },
  {
    name: 'Gender',
    selector: (row: { gender: string }) => row.gender,
    sortable: true,
  },
  {
    name: 'Street',
    selector: (row: { street: string }) => row.street,
    sortable: true,
  },
  {
    name: 'City',
    selector: (row: { city: string }) => row.city,
    sortable: true,
  },
  {
    name: 'State',
    selector: (row: { state: string }) => row.state,
    sortable: true,
  },
  {
    name: 'Zip',
    selector: (row: { zip: string }) => row.zip,
    sortable: true,
  },
  {
    name: 'Skills',
    selector: (row: { skills: string }) => row.skills,
    sortable: true,
  },
  {
    name: 'Experience',
    selector: (row: { experience: number }) => row.experience,
    sortable: true,
  },
  {
    name: 'Additional Info',
    selector: (row: { additionalInfo: string }) => row.additionalInfo,
    sortable: true,
  },
];

// const customStyles = {
//   header: {
//     style: {
//       backgroundColor: '#007bff',
//       color: '#ffffff',
//       fontFamily: 'Poppins, sans-serif',
//     },
//   },
//   rows: {
//     style: {
//       '&:nth-child(even)': {
//         backgroundColor: '#f2f2f2',
//       },
//       fontFamily: 'Poppins, sans-serif',
//       backgroundColor: '#ffffff',
//       borderRadius: '8px',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     },
//   },
//   cells: {
//     style: {
//       padding: '10px',
//       fontFamily: 'Poppins, sans-serif',
//     },
//   },
// };

const EmployeeList: React.FC = () => {
  const context = useContext(FormContext);

  if (!context) {
    return null;
  }

  const { employees } = context;

  return (
    <div className='data-table my-4'>
      <h2 className='text-center'>Employee List</h2>
      <DataTable
        // customStyles={customStyles}
        columns={columns}
        data={employees}
        pagination
      />
    </div>

  );
};

export default EmployeeList;