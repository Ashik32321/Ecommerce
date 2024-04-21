import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react'
import { useRegistration } from '../PurchaseComponent/PurchaseTopNavbar/LoginRegFiles/UseRegistration'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {useNavigate } from "react-router-dom"
import axios from "axios"
import Backbutton from "./BackButton"


function AdminLogin() {

    //PurchaseLoginVariables
    const [loading, setLoading] = useState(false);
    const [Admindetails, handleAdmindetails] = useRegistration({
        adminemail: "",
        adminpassword: "",
    })

    const nav = useNavigate()

    //PasswordToggle visibility
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Make a request to the admin login endpoint
            const result = await axios.post("https://ecommerce-5-74uc.onrender.com/adminlogin", Admindetails);
    
            if (result.data.status === "success") {
                // Retrieve the JWT token from the response
                const token = result.data.token;
    
                // Store the JWT token in local storage (you can also use session storage if preferred)
                sessionStorage.setItem("adminToken", token);
                
                
                // Navigate to the information page
                setLoading(false);
                nav('/informationpage');
            } else if (result.data.status === "passwordIncorrect") {
                setLoading(false);
                alert("The password is incorrect");
            } else if (result.data.status === "emailIncorrect") {
                setLoading(false);
                alert("The email is incorrect");
            } else {
                setLoading(false);
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            alert("Server error");
        }
    };
    
    return (
        <>
        <Backbutton />
    
        <div className="login-container mt-5 border border-dark shadow-sm p-1 mb-5 bg-white">
            <div className="mt-5 mb-5">
                <h2 className="text-primary text-center text-fluid">Admin Login Page</h2>
                <div className="d-flex justify-content-center ">
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Email:</label>
                            <div className="input-group">
                                <span className="btn btn-primary">Email</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="adminemail"
                                    value={Admindetails.adminemail}
                                    onChange={handleAdmindetails}
                                    placeholder='Admin Email...'
                                    required
                                />
                            </div>
                        </div>
    
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    name="adminpassword"
                                    value={Admindetails.adminpassword}
                                    onChange={handleAdmindetails}
                                    required
                                />
                                <button className="btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
    
                        {loading ? (
                            <button className="btn btn-secondary w-100" disabled>Loading...</button>
                        ) : (
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </>
    
    )
}

export default AdminLogin