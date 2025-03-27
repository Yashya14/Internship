import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserPlus,
  faInfoCircle,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg  z-50 relative">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link className="text-2xl font-semibold flex items-center" to="/">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-xl" />
          EMS
        </Link>

        {/* mobile menu toggle button */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* for desktop */}
        <div className="hidden lg:flex space-x-6 items-center">
          <ul className="flex space-x-6">
            <li
              className={`text-lg ${
                activeTab === "Home" ? "text-yellow-400" : "text-white"
              } hover:text-yellow-400`}
              onClick={() => setActiveTab("Home")}
            >
              <Link className="flex items-center" to="/">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
            </li>
            <li
              className={`text-lg ${
                activeTab === "AddUser" ? "text-yellow-400" : "text-white"
              } hover:text-yellow-400`}
              onClick={() => setActiveTab("AddUser")}
            >
              <Link className="flex items-center" to="/">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Add User
              </Link>
            </li>
            <li
              className={`text-lg ${
                activeTab === "About" ? "text-yellow-400" : "text-white"
              } hover:text-yellow-400`}
              onClick={() => setActiveTab("About")}
            >
              <Link className="flex items-center" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* for mobile devices */}
        <div
          className={`lg:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 right-0 bg-gray-800 text-center`}
        >
          <ul className="space-y-4 py-4">
            <li
              className={`text-lg ${
                activeTab === "Home" ? "text-yellow-400" : "text-white"
              } hover:text-yellow-400`}
              onClick={() => setActiveTab("Home")}
            >
              <Link className="flex justify-center items-center" to="/">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
            </li>
            <li
              className={`text-lg ${
                activeTab === "AddUser" ? "text-yellow-400" : "text-white"
              } hover:text-yellow-400`}
              onClick={() => setActiveTab("AddUser")}
            >
              <Link className="flex justify-center items-center" to="/">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Add User
              </Link>
            </li>
            <li
              className={`text-lg ${
                activeTab === "About" ? "text-yellow-400" : "text-white"
              } hover:text-yellow-400`}
              onClick={() => setActiveTab("About")}
            >
              <Link className="flex justify-center items-center" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
