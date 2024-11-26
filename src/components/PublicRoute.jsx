import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = localStorage.getItem('token'); // Check local storage for token

  if (userInfo || token) {
    // Redirect to create group if user is signed in but not in a group
    if (!userInfo.group) {
      return <Navigate to="/creategroup" />;
    }

    // Redirect to main page if user is in a group
    return <Navigate to="/main" />;
  }

  return children; // Render the public page if not authenticated
};

export default PublicRoute;