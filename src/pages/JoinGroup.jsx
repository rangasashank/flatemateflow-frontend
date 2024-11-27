import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HomeLanding from '../components/HomeLanding';
import SignOut from '../components/SingOut';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser, setLoading } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const JoinGroup = () => {
  const [groupName, setgroupName] = useState('');
  const [groupPassword, setgroupPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const userInfo = useSelector((state) => state.user.userInfo); // Access user details from userSlice
  const token = localStorage.getItem('token');
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch()
  useEffect(() => {
    if (loading) {
        return;
    }
    if (!loading && !userInfo) {
      return navigate("/")
    }
  
     if (!userInfo.group) {
        console.log("continue to create group")
      } else {
        navigate("/mainpage")
      }
    }, [userInfo, loading, navigate]);
  
    if (loading) {
      return <div>Loading...</div>;
    }

  const handleGroupJoin = async () => {
    console.log('Joining Group with:', { groupName, groupPassword }); // Debugging Log
    console.log(token)
    if (!groupName || !groupPassword) {
      alert('Please fill in both the group name and password.');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://flatemateflow-1buecqef.b4a.run/api/groups/join',
        { groupName, groupPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
      console.log('Group Joined:', response.data);
  
      // Fetch updated user profile
      dispatch(setLoading(true)); // Set loading state
      const userResponse = await axios.get(
        'https://flatemateflow-1buecqef.b4a.run/api/users/profile',
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      dispatch(setUser(userResponse.data)); // Update user in Redux
      dispatch(setLoading(false));
  
      alert('Group joined successfully!');
      navigate('/mainpage'); // Redirect to the main page
    } catch (error) {
      console.error('Group join Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error joining group. Please try again.');
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
          value={groupPassword}
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
