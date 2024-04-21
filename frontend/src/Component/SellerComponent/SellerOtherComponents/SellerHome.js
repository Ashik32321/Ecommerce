import React, { useState, useEffect } from 'react';
import SellerTopNavbar from "../SellerTopNavbar/SellerTopNavbar";
import SellerBottomNavbar from '../SellerBottomNavbar/SellerBottomNavbar';
import SellerProduct from '../SellerProducts/SellerProduct';
import SellerProfile from '../SellerProfile/SellerProfile';
import SellerFooter from './SellerFooter';
import SellerHomeMessage from "./SellerHomeMessage";

function SellerHome() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("sellertoken");
        setIsAuthenticated(!!token);
    }, []);


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
