import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HomeLanding from '../components/HomeLanding';
import SignOut from '../components/SingOut';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateGroup = () => {
  const [groupName, setgroupName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [password, setgroupPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const userInfo = useSelector((state) => state.user.userInfo); // Access user details from userSlice
  const token = localStorage.getItem('token');
  const handleGroup = async () => {
    try {
      if (userInfo.email === userEmail) {
        const response = await axios.post('https://flatemateflow-1buecqef.b4a.run/api/groups/creategroup', {
          groupName,
          password,
          userEmail
        }, {
          headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
      });
      console.log('Group Created:', response.data);
      alert("Group created succesfully")
      navigate('/mainpage'); // Redirect to the main page
      }
      else {
        console.log('Group could not be created as email does not match user email')
        alert("Email does not math the logged in user's email")
      }
      
      

    } catch (error) {
      console.error('Group creation Error:', error.response?.data || error.message);
      alert("Please try again")
    }
  };

  return (

<div className="relative flex items-center justify-center min-h-screen bg-[#EAF6FF]">
      {/* Home Button */}
      <HomeLanding />
      <SignOut />
      <motion.div
        className="p-6 bg-white rounded shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="mb-4 text-2xl font-bold text-center">Create Group</h1>
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="text"
          placeholder="Name"
          value={groupName}
          onChange={(e) => setgroupName(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setuserEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setgroupPassword(e.target.value)}
        />
        <motion.button
          onClick={handleGroup}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
        <p className="mt-4 text-sm text-center">
          Want to join a group?{' '}
          <a href="/joinGroup" className="text-blue-500">
            Join Group
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default CreateGroup;
