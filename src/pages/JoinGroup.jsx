import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HomeLanding from '../components/HomeLanding';
import SignOut from '../components/SingOut';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JoinGroup = () => {
  const [groupName, setgroupName] = useState('');
  const [password, setgroupPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const userInfo = useSelector((state) => state.user.userInfo); // Access user details from userSlice

  const handleGroupJoin = async () => {
    try {
      
        const response = await axios.post('https://flatemateflow-1buecqef.b4a.run/api/groups/join', {
          groupName,
          password
        });
      console.log('Group Joined:', response.data);
      alert("Group joined succesfully")
      navigate('/mainpage'); // Redirect to the main page 

    } catch (error) {
      console.error('Group join Error:', error.response?.data || error.message);
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
        <h1 className="mb-4 text-2xl font-bold text-center">Join Group</h1>
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="text"
          placeholder="Name"
          value={groupName}
          onChange={(e) => setgroupName(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setgroupPassword(e.target.value)}
        />
        <motion.button
          onClick={handleGroupJoin}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join
        </motion.button>
        <p className="mt-4 text-sm text-center">
          Want to Create a group?{' '}
          <a href="/creategroup" className="text-blue-500">
            Create Group
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default JoinGroup;
