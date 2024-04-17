import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
 // Import a library to decode JWT tokens

function PurchasePrivate({ children }) {
    // Retrieve the JWT token from local storage
    const token = sessionStorage.getItem('token');
    
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
    
    // Render children if the user is authenticated, otherwise redirect to login page
    return isAuthenticated ? children : <Navigate to="/gotopurchaselogin" />;
}

export default PurchasePrivate;
