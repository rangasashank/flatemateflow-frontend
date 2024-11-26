import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#EAF6FF]">
      {/* Top Navigation */}
      <div className="absolute top-4 right-4">
        <Link to="/signin">
          <motion.button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </Link>
        <Link to="/register">
          <motion.button
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Welcome to FlatmateFlow
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Simplify your roommate experience by managing tasks, expenses, and communication all in one place.
        </p>
        <Link to="/register">
          <motion.button
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;
