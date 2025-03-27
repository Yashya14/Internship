import React, { useState, useEffect } from "react";
import {IEmployee, IUserData, AddEditUserModalProps } from "./Employee.type";
import { v4 as uuidv4 } from "uuid";


const AddEditUserModal: React.FC<AddEditUserModalProps> = ({ onAdd, onClose, user }) => {
  const [userData, setUserData] = useState<IUserData>({ firstName: "", lastName: "", dateOfBirth: "", address: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (user) {
      setUserData({ firstName: user.firstName, lastName: user.lastName, dateOfBirth: user.dateOfBirth, address: user.address });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // for input validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!userData.firstName) newErrors.firstName = "Please enter first name!";
    if (!userData.lastName) newErrors.lastName = "Please enter last name!";
    if (!userData.dateOfBirth) newErrors.dateOfBirth = "Please enter date of birth!";
    if (!userData.address) newErrors.address = "Please enter address!";
    return newErrors;
  };

  // add or edit user locally
  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newUser: IEmployee = { id: user ? user.id : uuidv4(), ...userData };
    onAdd(newUser);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{user ? "Edit User" : "Add User"}</h2>
        <label className="block mb-2">
          First Name:
          <input
            name="firstName"
            type="text"
            value={userData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            placeholder="Enter your firstname"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        </label>

        <label className="block mb-4">
          Last Name:
          <input
            name="lastName"
            type="text"
            value={userData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your lastname"
            required
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </label>

        <label className="block mb-4">
          Last Name:
          <input
            name="dateOfBirth"
            type="date"
            value={userData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
        </label>

        <label className="block mb-4">
          Address:
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            placeholder="Enter your address"

          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </label>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {user ? "Update" : "Add"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditUserModal;