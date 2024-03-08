import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function TopNavbar() {
    const isButtonVisible = localStorage.getItem("userlogedin");
    const [searchQuery, setSearchQuery] = useState('');
    const nav = useNavigate()





    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/search?q=${searchQuery}`);

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
        <Navbar expand="lg" className="bg-white">
            <Container fluid className='ms-3'>
                <Navbar.Brand className='text-primary fw-bold'>
                    <img src="./Images/Shoplogo.png" height="60" width="200" alt='shoplogo' />
                </Navbar.Brand>

                <Form className="d-flex mt-2" onSubmit={handleSearch}>
                    <div className='input-group me-3'>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Search items"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                        />
                        <button className='btn btn-primary' type='submit'>Search</button>
                    </div>
                </Form>

                {isButtonVisible === "false" && (
                    <Link to="/purchaselogin" className='btn btn-success me-1 mt-2'>Login</Link>
                )}

                {isButtonVisible === "true" && (
                    <button onClick={logout} className='btn  btn-danger me-1 mt-2'>Logout</button>
                )}
            </Container>
        </Navbar>
    );
}

export default TopNavbar;

