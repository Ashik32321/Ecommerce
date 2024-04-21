import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../PurchaseCssFiles/PurchaseTopNavbar.css";
import FlottingButton from "../PurchaseOtherComponent/FlottingButton";
import '../PurchaseCssFiles/FlottingButton.css';

function TopNavbar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for JWT token in local storage to determine login status
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://ecommerce-5-74uc.onrender.com/search?q=${searchQuery}`);

            const items = response.data;
            const dataArrayString = JSON.stringify(items);
            sessionStorage.setItem("searchitem", dataArrayString);
            navigate("/searchdisplay");
        } catch (error) {
            alert('Error searching items');
            // Handle error, display an error message to the user, etc.
        }
    };

    const handleLogout = () => {
        // Remove the JWT token from local storage
        sessionStorage.removeItem("token");
        alert("Logged out successfully");
        // Set isLoggedIn state to false
        setIsLoggedIn(false);
        // Optionally, redirect to the login page or refresh the page
        
    };

    return (
        <Navbar fixed="top" expand="lg" className="bg-white">
            <Container fluid className='ms-3'>
                <Navbar.Brand className='text-primary fw-bold'>
                    <img src="./Images/Shoplogo.png" height="60" width="200" alt='shoplogo' />
                </Navbar.Brand>

                <Form className="d-flex mt-2" onSubmit={handleSearch}>
                    <div className='input-group me-1'>
                        <input
                            className="searchinput"
                            type="text"
                            placeholder="Search items"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                        />
                        <button className='btn btn-primary' type='submit'>Search</button>
                    </div>
                </Form>

                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout} className='btn btn-danger mt-2 lbtn'>Logout</button>
                        <FlottingButton position="floating-button-bottom-right" />
                    </>
                ) : (
                    <Link to="/purchaselogin" className='btn btn-success mt-2 lbtn'>Login</Link>
                )}
            </Container>
        </Navbar>
    );
}

export default TopNavbar;
