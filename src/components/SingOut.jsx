import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        

  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found for logout');
      return;
    }

    // Make the logout API call
    await axios.post(
      'https://flatemateflow-1buecqef.b4a.run/api/users/logout',
      {}, // Empty body
      {
        headers: { Authorization: `Bearer ${token}` }, // Send the token in the header
      }
    );

    // Clear token from local storage after successful logout
    localStorage.removeItem('token');

    // Reset Redux state
    dispatch(logoutUser());

    navigate('/')
        } catch (error) {
          console.error('Logout Error:', error.response?.data || error.message);
        }
      };
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}>
      <div className="absolute top-10 left-5">
          <motion.button
            onClick={handleSignOut}
            className="px-4 py-2 mr-2 w-200 text-white bg-red-600 rounded hover:bg-red-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Out
          </motion.button>
        
      </div>
</motion.div>
    )
}
export default SignOut;