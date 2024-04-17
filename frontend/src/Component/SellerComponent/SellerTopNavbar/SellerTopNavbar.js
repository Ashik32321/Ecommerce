import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../SellerCssFiles/SellerTopNavbar.css";
import SellerFlottingbutton from '../SellerOtherComponents/SellerFlottingbutton';

function SellerTopNavbar() {
    // State to track whether the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to log out the user
    const logout = () => {
        // Remove the JWT token from session storage to log out the user
        sessionStorage.removeItem("sellertoken");
        
        // Update the isLoggedIn state to false
        setIsLoggedIn(false);
        
        // Show a success message
        alert("Logged out successfully");
        window.location.reload()
    };

    // Use effect hook to update the isLoggedIn state based on the presence of the token
    useEffect(() => {
        const token = sessionStorage.getItem("sellertoken");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <nav className='navbar bg-white fixed-top'>
            <div className='container-fluid ms-3 w-100'>
                <div className='navbar-brand text-primary fw-bold'>
                    <img src="./Images/ShopSellerlogo.jpg" alt="Mini basket" className='logosize' />
                </div>
                {isLoggedIn ? (
                    <>
                        <button onClick={logout} className='btn btn-danger me-1 mt-2'>
                            Logout
                        </button>
                        <SellerFlottingbutton position="floating-button-bottom-right" />
                    </>
                ) : (
                    <Link to="/sellerlogin" className='btn btn-success me-1 mt-2'>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default SellerTopNavbar;
