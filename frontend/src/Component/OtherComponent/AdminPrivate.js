import React from 'react';
import { Navigate } from 'react-router-dom';


function AdminPrivate({ children }) {
    // Retrieve the JWT token from local storage
    const token = sessionStorage.getItem('adminToken');

    
 

    // Check if the token is valid
    const isAuthenticated = token 

    // Render children if the user is authenticated, otherwise redirect to admin login page
    return isAuthenticated ? children : <Navigate to="/admingotologin" />;
}

export default AdminPrivate;
