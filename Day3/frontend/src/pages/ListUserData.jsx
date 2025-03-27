import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const ListUserData = ({ editUser, data, getUsers }) => {
  // State to manage the list of users
  // const [data, setData] = useState([]);

  // // Fetch users
  // useEffect(() => {
  //   getUsers();
  // }, []);

  // // Function to fetch all users
  // const getUsers = async () => {
  //   const result = await axios.get("http://localhost:8000/users");
  //   if (result.status === 200) setData(result.data);
  // };

  // Function to delete a user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const result = await axios.delete(`http://localhost:8000/user/${id}`);
      if (result.status === 200) {
        toast.success("User deleted successfully!");
        getUsers(); // Refresh the list of users
      } else {
        toast.error("Failed to delete user. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg w-full bg-white">
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                  <th className="px-6 py-3 text-left">Sr No.</th>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Contact</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`border-t hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {employee.contact}
                    </td>
                    <td className="px-6 py-4 flex space-x-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                        onClick={() => editUser(employee.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                        onClick={() => deleteUser(employee.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>

                      <Link to={`/view/${employee.id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListUserData;
