import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo); // Check Redux state
  

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check local storage
    if (!userInfo && !token) {
      navigate("/");
    }
    
  }, [userInfo]);

  

  return children;
};

export default PrivateRoute;
