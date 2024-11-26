import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo); // Check Redux state
  const token = localStorage.getItem('token'); // Check local storage

  // Redirect to sign-in if user info or token is missing
  if (!userInfo && !token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
