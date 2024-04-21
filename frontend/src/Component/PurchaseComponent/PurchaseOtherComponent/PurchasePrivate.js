import React from 'react';
import { Navigate } from 'react-router-dom';



function PurchasePrivate({ children }) {
    // Retrieve the JWT token from local storage
    const token = sessionStorage.getItem('token');
   

    // Check if the token is valid
    const isAuthenticated = token ;
    
    // Render children if the user is authenticated, otherwise redirect to login page
    return isAuthenticated ? children : <Navigate to="/gotopurchaselogin" />;
}

export default PurchasePrivate;
