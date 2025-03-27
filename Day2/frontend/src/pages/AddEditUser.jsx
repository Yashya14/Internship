import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  role: "",
  skills: [],
};

const AddEditUser = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, contact, gender, role, skills } = formData;

  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // Hook to navigate

  // Fetch user data if ID is present (for editing)
  useEffect(() => {
    if (id) {
      console.log("id", id);
      getSingleUser(id);
    } else {
      setFormData(initialState);
    }
  }, [id]);

  // Function to fetch a single user's data
  const getSingleUser = async (id) => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users/${id}`);
      if (result.status === 200 && result.data) {
        setFormData(result.data);
      } else {
        setFormData(initialState);
      }
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  // Function to add a new user
  const addEmployee = async (formData) => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/users",
        formData
      );
      if (result.status === 201) {
        toast.success("User added successfully!");
        setFormData(initialState);
        navigate("/"); // Navigate back to home page
        return;
      }
    } catch (error) {
      toast.error("Failed to add user. Please try again.");
    }
  };

  // Function to update an existing user
  const updateEmployee = async (formData, id) => {
    try {
      console.log("id", id);
      const result = await axios.put(
        `http://localhost:8000/api/users/${id}`,
        formData
      );
      if (result.status === 200) {
        toast.success("User updated successfully!");
        setFormData(initialState);
        navigate("/");
        return;
      }
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !contact ||
      !gender ||
      !role ||
      skills.length === 0
    ) {
      toast.error("Please fill in all the required fields.");
    } else {
      if (id) {
        updateEmployee(formData, id);
      } else {
        addEmployee(formData);
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, skills: [...skills, value] });
      } else {
        setFormData({
          ...formData,
          skills: skills.filter((skill) => skill !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="max-w-2xl mx-auto my-3">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="card shadow-lg border-2 border-gray-300 rounded-xl mb-5 p-6">
              <div className="card-body">
                <h2 className="text-2xl text-center mb-6 font-semibold text-gray-800">
                  {id ? "Update User" : "Add User"}
                </h2>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-input mt-1 block w-full border rounded-md border-gray-300 shadow-sm text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        onChange={handleInputChange}
                        value={name}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-input mt-1 block w-full border rounded-md border-gray-300 shadow-sm text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        value={email}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Contact
                    </label>
                    <input
                      type="tel"
                      className="form-input mt-1 block w-full border rounded-md border-gray-300 shadow-sm text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      id="contact"
                      name="contact"
                      placeholder="Enter your contact number"
                      onChange={handleInputChange}
                      value={contact}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Gender
                    </label>
                    <div className="flex items-center space-x-6">
                      <div>
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="Male"
                          onChange={handleInputChange}
                          checked={gender === "Male"}
                          className="mr-2"
                        />
                        <label htmlFor="male" className="text-sm">
                          Male
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="Female"
                          onChange={handleInputChange}
                          checked={gender === "Female"}
                          className="mr-2"
                        />
                        <label htmlFor="female" className="text-sm">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Role
                    </label>
                    <select
                      className="form-select mt-1 block w-full border rounded-md border-gray-300 shadow-sm text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      id="role"
                      name="role"
                      onChange={handleInputChange}
                      value={role}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Skills
                    </label>
                    <div className="flex items-center space-x-6">
                      <div>
                        <input
                          type="checkbox"
                          id="html"
                          name="skills"
                          value="HTML"
                          onChange={handleInputChange}
                          checked={skills.includes("HTML")}
                          className="mr-2"
                        />
                        <label htmlFor="html" className="text-sm">
                          HTML
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="css"
                          name="skills"
                          value="CSS"
                          onChange={handleInputChange}
                          checked={skills.includes("CSS")}
                          className="mr-2"
                        />
                        <label htmlFor="css" className="text-sm">
                          CSS
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="javascript"
                          name="skills"
                          value="JavaScript"
                          onChange={handleInputChange}
                          checked={skills.includes("JavaScript")}
                          className="mr-2"
                        />
                        <label htmlFor="javascript" className="text-sm">
                          JavaScript
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center py-4">
                    <button
                      className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                      type="submit"
                    >
                      {id ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditUser;
