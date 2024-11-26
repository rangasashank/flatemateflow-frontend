import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CreateGroup from './pages/CreateGroup';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import { setUser } from './redux/userSlice';
import JoinGroup from './pages/JoinGroup';
import PublicRoute from './components/PublicRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const rehydrateUser = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
    console.log('Retrieved Token:', token); // Debugging

    if (token) {
      try {
        const response = await axios.get('https://flatemateflow-1buecqef.b4a.run/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(response.data)); // Save user details to Redux
      } catch (error) {
        console.error('Error fetching user details:', error.response?.data || error.message);
        localStorage.removeItem('token'); // Remove invalid token
      }
    } else {
      console.log('No token found in local storage.');
    }
  };

    rehydrateUser();
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/creategroup" element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
        <Route path="/joingroup" element={<PrivateRoute><JoinGroup /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;