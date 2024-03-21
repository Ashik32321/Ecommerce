import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../PurchaseCssFiles/PurchaseTopNavbar.css"


function TopNavbar() {
    let  isButtonVisible =useState("false")
    isButtonVisible = localStorage.getItem("userlogedin");
    const [searchQuery, setSearchQuery] = useState('');
    const nav = useNavigate()





    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://ecommerce-5-74uc.onrender.com/search?q=${searchQuery}`);

            let items = response.data

            const dataArrayString = JSON.stringify(items);
            localStorage.setItem("searchitem", dataArrayString)
            nav("/searchdisplay")


        } catch (error) {
            console.error('Error searching items:', error);
            // Handle error, display an error message to the user, etc.
        }
    };


    const logout = () => {
        localStorage.setItem("userlogedin", false)
        alert("logged out successfuly")
        window.location.reload();
    }


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

               

                  {isButtonVisible === "true" ? (
                    <button onClick={logout} className='btn  btn-danger mt-2 lbtn'>Logout</button>
                    ) : (
                        <Link to="/purchaselogin" className='btn btn-success  mt-2 lbtn'>Login</Link>)}


               
            </Container>
        </Navbar>
    );
}

export default TopNavbar;

