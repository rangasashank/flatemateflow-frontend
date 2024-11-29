import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HomeLanding from '../components/HomeLanding';
import SignOut from '../components/SingOut';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../redux/userSlice';


const CreateGroup = () => {
  const [groupName, setgroupName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [password, setgroupPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const userInfo = useSelector((state) => state.user.userInfo); // Access user details from userSlice
  const loading = useSelector((state) => state.user.loading);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch()
  useEffect(() => {
    if (loading) {
      return;
  }
  if (!userInfo) {
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
      console.log('Group Created:');
        try {
          dispatch(setLoading(false))
          const response = await axios.get('https://flatemateflow-1buecqef.b4a.run/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data)
          dispatch(setUser(response.data)); // Save user details to Redux
        } catch (error) {
          console.error('Error fetching user details:', error.response?.data || error.message);
          localStorage.removeItem('token'); // Remove invalid token
          dispatch(setLoading(false))
        }
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
          <a href="/joingroup" className="text-blue-500">
            Join Group
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default CreateGroup;
