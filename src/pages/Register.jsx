import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HomeLanding from '../components/HomeLanding';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://flatemateflow-1buecqef.b4a.run/api/users/register', {
        name,
        email,
        password,
      });
      console.log('Registered:', response.data);
      alert("User registered succesfully, Please login")
      navigate('/signin'); // Redirect to the Sign In page

    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
    }
  };

  return (

<div className="relative flex items-center justify-center min-h-screen bg-[#EAF6FF]">
      {/* Home Button */}
      <HomeLanding />
      <motion.div
        className="p-6 bg-white rounded shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="mb-4 text-2xl font-bold text-center">Register</h1>
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <motion.button
          onClick={handleRegister}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
