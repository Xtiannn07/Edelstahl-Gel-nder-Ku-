import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper component for routes that require admin authentication
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactNode} - The protected component or redirect
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();
  
  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/admin/login" />;
  }
  
  if (!isAdmin) {
    // Logged in but not an admin, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

  // User is logged in and is an admin
  return children;
};

export default ProtectedRoute;