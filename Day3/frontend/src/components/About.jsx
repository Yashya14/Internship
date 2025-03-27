import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="container mx-auto my-5 px-4">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-10/12 lg:w-8/12 xl:w-7/12 px-2">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <h1 className="text-center text-3xl font-bold text-blue-600 mb-4">Employee Management System</h1>
              <p className="text-gray-700 text-lg mb-4">
                Welcome to the Employee Management System. This application is designed to help you manage employee data efficiently. You can add, update, view, and delete employee information with ease.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Our goal is to provide a simple and intuitive interface for managing employee records. Whether you are a small business or a large corporation, our system is designed to scale with your needs.
              </p>
              <p className="text-gray-700 text-lg font-semibold mb-2">Key Features:</p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 hover:bg-green-50 rounded-lg px-4 py-2 cursor-pointer transition-colors">
                  <FontAwesomeIcon icon={faUserPlus} className="text-green-500 text-xl" />
                  <span className="text-gray-700">Add new employees</span>
                </li>
                <li className="flex items-center space-x-3 hover:bg-yellow-50 rounded-lg px-4 py-2 cursor-pointer transition-colors">
                  <FontAwesomeIcon icon={faEdit} className="text-yellow-500 text-xl" />
                  <span className="text-gray-700">Update existing employee information</span>
                </li>
                <li className="flex items-center space-x-3 hover:bg-teal-50 rounded-lg px-4 py-2 cursor-pointer transition-colors">
                  <FontAwesomeIcon icon={faEye} className="text-teal-500 text-xl" />
                  <span className="text-gray-700">View detailed employee profiles</span>
                </li>
                <li className="flex items-center space-x-3 hover:bg-red-50 rounded-lg px-4 py-2 cursor-pointer transition-colors">
                  <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 text-xl" />
                  <span className="text-gray-700">Delete employee records</span>
                </li>
              </ul>
              <p className="text-gray-700 text-lg mt-4">
                We hope you find our Employee Management System useful and easy to use. If you have any questions or feedback, please feel free to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
