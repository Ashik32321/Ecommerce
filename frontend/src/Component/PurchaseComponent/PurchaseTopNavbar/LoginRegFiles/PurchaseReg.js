// PurchaseReg.js
import "bootstrap/dist/css/bootstrap.min.css"
import './CssFiles/PurchaseLoginReg.css' 
import React, { useState } from 'react';
import { useRegistration } from "./UseRegistration";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../../OtherComponent/BackButton"

function PurchaseReg() {
    const [Userdetails, handleUserDetails] = useRegistration({
        username: "",
        userphone: "",
        userpassword: "",
        usercpassword: ""
    });

    const nav = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // State for alert messages
    const [nameAlert, setNameAlert] = useState("");
    const [phoneAlert, setPhoneAlert] = useState("");
    const [passwordAlert, setPasswordAlert] = useState("");
    const [cpasswordAlert, setCPasswordAlert] = useState("");

    const validate = async (e) => {
        e.preventDefault();

        // Reset alert messages
        setNameAlert("");
        setPhoneAlert("");
        setPasswordAlert("");
        setCPasswordAlert("");

        try {
            // Input validation
            if (Userdetails.username === "") {
                setNameAlert("First name shouldn't be null");
                return;
            }
            if (Userdetails.userphone === "") {
                setPhoneAlert("Phone shouldn't be null");
                return;
            }
            if (Userdetails.userpassword === "") {
                setPasswordAlert("Password shouldn't be null");
                return;
            }
            if (Userdetails.userpassword.length < 8) {
                setPasswordAlert("Password should be at least 8 characters");
                return;
            }
            if (Userdetails.usercpassword === "") {
                setCPasswordAlert("Confirm Password shouldn't be null");
                return;
            }
            if (Userdetails.userpassword !== Userdetails.usercpassword) {
                setCPasswordAlert("Password mismatch");
                return;
            }

            // Axios post request
            const result = await axios.post("http://localhost:3001/reg", { ...Userdetails });

            console.log(result); // Log the entire response for debugging

            if (result.data.includes("user already registered")) {
                // Display a message in the UI or handle as needed
                alert("User already registered");
                nav("../purchaselogin");
            } else if (result.data.includes("user registered successfully")) {
                // Display a message in the UI or handle as needed
                alert("Registered successfully");
                nav("../purchaselogin");
            } else {
                // Handle unexpected response format
                alert("Unexpected server response");
            }
        } catch (error) {
            // Log the error to the console for debugging
            console.error("Error:", error);

            // Display a generic error message to the user
            // You may choose to provide more user-friendly messages
            alert("An error occurred. Please try again later.");
        }
    };
    return (
        <>
            <Backbutton/>
            <div className="container mt-3
         border border-dark shadow-sm p-1 mb-5 bg-white  ">
                <div className="mt-5 mb-5">
                    <h2 className="text-primary text-center">Registration</h2>

                    <div className="d-flex justify-content-center ">
                        <form action="post" onSubmit={validate}>
                            <label className="form-label"> Name :</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                value={Userdetails.username}
                                onChange={handleUserDetails}
                                placeholder='Your First Name...' />
                            <div className="text-danger">{nameAlert}</div><br />

                            <label className="form-label"> Phone :</label>
                            <div className="input-group">
                                <span className="btn btn-primary">+91</span>
                                <input className="form-control"
                                    type="tel"
                                    name="userphone"
                                    value={Userdetails.userphone}
                                    onChange={handleUserDetails}
                                    pattern="[0-9]{10}"
                                    placeholder='Your Phone...' />
                            </div>
                            <div className="text-danger">{phoneAlert}</div><br />

                            <label className="form-label"> Password :</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    name="userpassword"
                                    value={Userdetails.userpassword}
                                    onChange={handleUserDetails}
                                />
                                <button className="btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="text-danger">{passwordAlert}</div><br />

                            <label className="form-label"> Confirm Password : </label><br />
                            <input
                                className="form-control"
                                type="password"
                                name="usercpassword"
                                value={Userdetails.usercpassword}
                                onChange={handleUserDetails}
                            />
                            <div className="text-danger">{cpasswordAlert}</div><br />

                            <button type="submit" className="btn btn-primary w-100">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseReg;  