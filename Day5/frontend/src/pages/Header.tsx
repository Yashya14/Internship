import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-semibold flex items-center text-yellow-400">
          EMS
        </div>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-8 items-center">
          <ul className="flex space-x-6">
            <Link to="/">
              <li
                className={`flex items-center space-x-2 text-lg ${
                  activeTab === "Home" ? "text-yellow-400" : "text-white"
                } hover:text-yellow-400 transition-colors duration-300`}
                onClick={() => handleTabClick("Home")}
              >
                <FaHome />
                <span>Home</span>
              </li>
            </Link>
            <Link to="/about">
              <li
                className={`flex items-center space-x-2 text-lg ${
                  activeTab === "About" ? "text-yellow-400" : "text-white"
                } hover:text-yellow-400 transition-colors duration-300`}
                onClick={() => handleTabClick("About")}
              >
                <FaInfoCircle />
                <span>About</span>
              </li>
            </Link>
          </ul>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute top-16 left-0 right-0 bg-gray-800 text-center rounded-b-xl shadow-lg transition-all duration-300`}
        >
          <ul className="space-y-4 py-4">
            <Link to="/">
              <li
                className={`flex items-center justify-center space-x-2 text-lg ${
                  activeTab === "Home" ? "text-yellow-400" : "text-white"
                } hover:text-yellow-400 transition-colors duration-300`}
                onClick={() => handleTabClick("Home")}
              >
                <FaHome />
                <span>Home</span>
              </li>
            </Link>

            <Link to="/about">
              <li
                className={`flex items-center justify-center space-x-2 text-lg ${
                  activeTab === "About" ? "text-yellow-400" : "text-white"
                } hover:text-yellow-400 transition-colors duration-300`}
                onClick={() => handleTabClick("About")}
              >
                <FaInfoCircle />
                <span>About</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
