import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';





function AdminNavbar() {
    const nav = useNavigate();

    const logout = async () => {
        const token = sessionStorage.getItem('adminToken'); 

        try {
            await axios.post('https://ecommerce-5-74uc.onrender.com/adminlogout', {}, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            });

            // Clear the token from local storage
            sessionStorage.removeItem('adminToken');
            
            // Notify the admin of successful logout
            alert('Logged out successfully');

            // Redirect to the home page
            nav('/');
        } catch (error) {
            // Handle any errors during the logout process
            console.error('Error during logout:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <nav className='navbar bg-white'>
            <div className='container-fluid ms-3 w-100'>
                <div className='navbar-brand text-primary fw-bold'>
                    <img src="./Images/shoplogo.png" alt="Mini basket" className='logosize' />
                </div>
                
                <button className="btn btn-danger btn-block" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default AdminNavbar;
