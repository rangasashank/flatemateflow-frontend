import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setUser } from '../redux/userSlice';
import HomeLanding from '../components/HomeLanding';
import axios from 'axios';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://flatemateflow-1buecqef.b4a.run/api/users/login', {
        email,
        password,
      });
      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      dispatch(setUser(response.data.user));
      console.log('Logged in:');
      alert("Sign in succesfull")
      
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response.data.message)
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
        <h1 className="mb-4 text-2xl font-bold text-center">Sign In</h1>
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
          onClick={handleSignIn}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
