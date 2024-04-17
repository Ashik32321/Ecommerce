import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminPrivate({ children }) {
    // Retrieve the JWT token from local storage
    const token = sessionStorage.getItem('adminToken');

    // Function to verify the token's validity and expiration
    const isTokenValid = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            // Check if the token is expired
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decodedToken.exp > currentTime;
        } catch (error) {
            // If there is any error decoding the token, consider it invalid
            return false;
        }
    };

    // Check if the token is valid
    const isAuthenticated = token && isTokenValid(token);

    // Render children if the user is authenticated, otherwise redirect to admin login page
    return isAuthenticated ? children : <Navigate to="/admingotologin" />;
}

export default AdminPrivate;
