import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h5 className="text-lg font-semibold mb-3">Follow Us</h5>
          <div className="flex justify-center space-x-6">
            <Link
              to="https://facebook.com"
              target="_blank"
              className="text-white hover:text-blue-600 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Link>
            <Link
              to="https://linkedin.com/in/yash-gajanan-pal"
              target="_blank"
              className="text-white hover:text-blue-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </Link>
            <Link
              to="https://github.com/Yashya14"
              target="_blank"
              className="text-white hover:text-gray-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Link>
            <Link
              to="mailto:info@example.com"
              target="_blank"
              className="text-white hover:text-red-500 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs mb-2">
            © 2025 Employee Management System. All Rights Reserved.
          </p>
          <p className="text-xs">
            Created by Yash{" "}
            <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
