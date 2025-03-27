import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  // Function to fetch a single user's data
  const getUser = async (id) => {
    try {
      const result = await axios.get(`http://localhost:8000/user/${id}`);
      if (result.status === 200) {
        setUser(result.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  return (
    <div className="container mx-auto my-10 px-4 z-10 relative">
      <div className="flex justify-center">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-300 ease-in-out">
            <h2 className="text-center text-4xl font-bold text-white mb-6">
              User Details
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between text-lg text-white">
                <span className="font-medium">ID :</span>{" "}
                <span className="font-light">{user.id}</span>
              </li>
              <li className="flex justify-between text-lg text-white">
                <span className="font-medium">Name :</span>{" "}
                <span className="font-light">{user.name}</span>
              </li>
              <li className="flex justify-between text-lg text-white">
                <span className="font-medium">Email :</span>{" "}
                <span className="font-light">{user.email}</span>
              </li>
              <li className="flex justify-between text-lg text-white">
                <span className="font-medium">Contact :</span>{" "}
                <span className="font-light">{user.contact}</span>
              </li>
              <li className="flex justify-between text-lg text-white">
                <span className="font-medium">Role :</span>{" "}
                <span className="font-light">{user.role}</span>
              </li>
              <li className="text-lg text-white">
                <span className="font-medium">Skills :</span>
                <ul className="ml-4 space-y-2">
                  {user.skills &&
                    user.skills.map((skill, index) => (
                      <li key={index} className="text-white">
                        {skill}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>

            <div className="mt-8 flex justify-center">
              <button
                className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
