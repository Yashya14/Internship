import React from "react";
import { useState } from "react";
import { EmployeeData } from "../Employee.js";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Employee = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  //   console.log(data);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  // delete data from table
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete?")) {
        const empData = data.filter((emp) => emp.id !== id);
        setData(empData);
      }
    }
  };

  // edit data
  const handleEdit = (id) => {
    const empData = data.find((emp) => emp.id === id);
    if (empData !== undefined) {
      setIsUpdate(true);
      setId(empData.id);
      setFirstName(empData.firstName);
      setLastName(empData.lastName);
      setAge(empData.age);
    }
  };

  // clear data
  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setId(0);
    setIsUpdate(false);
    
  };

  // save data
  const handleSave = (e) => {
    e.preventDefault();

    const empData = [...data];
    const newEmp = {
      id: empData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    empData.push(newEmp);
    setData((prev) => [...prev, newEmp]);
    handleClear();

    // setData([...data, newEmp]);
  };

  // update data
  const handleUpdate = (e) => {
    e.preventDefault();
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const empData = [...data];
    empData[index].firstName = firstName;
    empData[index].lastName = lastName;
    empData[index].age = age;

    setData(empData);
    handleClear();
  };

  return (
    <>
      <h1 className="text-center mb-4 mt-3">Employee Data</h1>
      <div className="container mt-3 d-flex justify-content-center">
        <div className="form-container w-50 p-4 border rounded shadow-sm">
          <form className="needs-validation" noValidate>
            <div className="mb-3 w-100 has-validation">
              <label htmlFor="firstName" className="form-label">
                FirstName
              </label>
              <input
                type="text"
                className={`form-control`}
                id="firstName"
                placeholder="enter your firstname"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            
            </div>

            <div className="mb-3 w-100 has-validation">
              <label htmlFor="lastName" className="form-label">
                LastName
              </label>
              <input
                type="text"
                className={`form-control `}
                id="lastName"
                placeholder="enter your lastname"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
              
            </div>

            <div className="mb-3 w-100 has-validation">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className={`form-control `}
                id="age"
                placeholder="enter your age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                required
              />
             
            </div>

            {!isUpdate ? (
              <button
                className="btn btn-success m-2"
                onClick={(e) => handleSave(e)}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-danger m-2"
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            )}

            <button className="btn btn-primary" onClick={() => handleClear()}>
              Clear
            </button>
          </form>
        </div>
      </div>

      <Table striped bordered hover className="container mt-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Employee;
