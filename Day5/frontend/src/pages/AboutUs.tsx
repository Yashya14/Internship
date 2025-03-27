import React from "react";
import { FaRocket, FaUsers, FaCogs, FaGlobe, FaReact, FaNodeJs, FaServer } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiExpress, SiYoast } from "react-icons/si";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20" id="about-us">
      <div className="max-w-7xl mx-auto text-center px-6 sm:px-8">
        {/* Hero Section */}
        <motion.h2
          className="text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg text-white opacity-80 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We're a team of passionate innovators who strive to create scalable solutions that help businesses grow faster and more efficiently.
        </motion.p>

        {/* Feature Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Innovation */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-tr-2xl rounded-bl-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaRocket className="text-blue-500 text-6xl sm:text-7xl p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p>
              We focus on pushing boundaries and embracing cutting-edge technology to deliver innovative solutions for your needs.
            </p>
          </motion.div>

          {/* Collaboration */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-tr-2xl rounded-bl-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaUsers className="text-green-500 text-6xl sm:text-7xl p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p>
              Teamwork is at the heart of everything we do. We believe in working together to create the best outcomes.
            </p>
          </motion.div>

          {/* Efficiency */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-tr-2xl rounded-bl-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaCogs className="text-red-500 text-6xl sm:text-7xl p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
            <p>
              We streamline processes to ensure the best performance, optimizing productivity across all aspects of your business.
            </p>
          </motion.div>

          {/* Global Impact */}
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-tr-2xl rounded-bl-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaGlobe className="text-purple-500 text-6xl sm:text-7xl p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
            <p>
              Our mission is to impact businesses globally by providing solutions that scale to your needs.
            </p>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          className="bg-white p-12 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-extrabold text-gray-800 mb-6">Our Tech Stack</h3>
          <p className="text-lg text-gray-600 opacity-80 mb-6 max-w-2xl mx-auto">
            We use cutting-edge technologies to build our platform. Here’s what we rely on to deliver scalable and efficient solutions:
          </p>
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="text-center mb-6">
              <FaReact className="text-blue-400 text-6xl sm:text-7xl mb-4 p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
              <p className="text-gray-800">React</p>
            </div>
            <div className="text-center mb-6">
              <SiTypescript className="text-blue-600 text-6xl sm:text-7xl mb-4 p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
              <p className="text-gray-800">TypeScript</p>
            </div>
            <div className="text-center mb-6">
              <SiTailwindcss className="text-teal-400 text-6xl sm:text-7xl mb-4 p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
              <p className="text-gray-800">TailwindCSS</p>
            </div>
            <div className="text-center mb-6">
              <SiExpress className="text-gray-700 text-6xl sm:text-7xl mb-4 p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
              <p className="text-gray-800">Express</p>
            </div>
            <div className="text-center mb-6">
              <FaNodeJs className="text-green-500 text-6xl sm:text-7xl mb-4 p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" />
              <p className="text-gray-800">Node.js</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
