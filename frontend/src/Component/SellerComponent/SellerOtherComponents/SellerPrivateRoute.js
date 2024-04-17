import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import a library to decode JWT tokens

function SellerPrivateRoute({ children }) {
    // Retrieve the JWT token from session storage
    const token = sessionStorage.getItem('sellertoken');

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

    // Check if the token is valid and the user is logged in
    const isAuthenticated = token && isTokenValid(token);

    // Render the children if the user is authenticated, otherwise redirect to the seller login page
    return isAuthenticated ? children : <Navigate to="/gotosellerlogin" />;
}

export default SellerPrivateRoute;
