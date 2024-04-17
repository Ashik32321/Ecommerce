import React, { useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import SellerTopNavbar from "../SellerTopNavbar/SellerTopNavbar";
import SellerBottomNavbar from '../SellerBottomNavbar/SellerBottomNavbar';
import SellerProduct from '../SellerProducts/SellerProduct';
import SellerProfile from '../SellerProfile/SellerProfile';
import SellerFooter from './SellerFooter';
import SellerHomeMessage from "./SellerHomeMessage";

function SellerHome() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Memoized function to verify the token's validity and expiration
    const isTokenValid = useCallback((token) => {
        try {
            const decodedToken = jwtDecode(token);
            // Check if the token is expired
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decodedToken.exp > currentTime;
        } catch (error) {
            // If there is any error decoding the token, consider it invalid
            return false;
        }
    }, []);

    // Memoized function to update authentication status based on the token
    const updateAuthenticationStatus = useCallback(() => {
        const token = sessionStorage.getItem("sellertoken");
        setIsAuthenticated(token && isTokenValid(token));
    }, [isTokenValid]);

    // Use effect hook to listen for changes in session storage and update authentication status
    useEffect(() => {
        // Update authentication status on component mount
        updateAuthenticationStatus();

        // Event listener for changes in session storage
        const handleStorageChange = () => {
            updateAuthenticationStatus();
        };

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [updateAuthenticationStatus]);

    return (
        <div>
            <SellerTopNavbar />
            {isAuthenticated ? (
                <div>
                    <SellerProfile />
                    <SellerProduct />
                    <SellerFooter />
                </div>
            ) : (
                <SellerHomeMessage />
            )}
            <SellerBottomNavbar />
        </div>
    );
}

export default SellerHome;
