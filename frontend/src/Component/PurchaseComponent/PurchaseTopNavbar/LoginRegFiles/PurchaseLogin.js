import "bootstrap/dist/css/bootstrap.min.css"
import './CssFiles/PurchaseLoginReg.css' 
import React, { useState } from 'react'
import { useRegistration } from './UseRegistration'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import Backbutton from "../../../OtherComponent/BackButton"

function PurchaseLogin() {

    //PurchaseLoginVariables
    const [Userdetails, handleUserDetails] = useRegistration({
        userphone: "",
        userpassword: "",
    })

    const nav = useNavigate()

    //PasswordToggle visibility
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Authentication and  Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post("https://ecommerce-5-74uc.onrender.com/login", { ...Userdetails });
            console.log(result);

            if (result.data.status === "success") {
                localStorage.setItem("userlogedin", JSON.stringify(true));
                localStorage.setItem("userId", JSON.stringify(result.data.userId));
                nav('../');
            } else if (result.data.status === "passwordIncorrect") {
                alert("The password is incorrect");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }
    };
    return (
        <>
            <Backbutton />

            <div className=" login-container mt-5  border border-dark shadow-sm p-1 mb-5 bg-white   ">
                <div className="mt-5 mb-5">
                    <h2 className="text-primary text-center text-fluid">Login Page</h2>
                    <div className="d-flex justify-content-center ">
                        <form action="post" onSubmit={handleSubmit}>
                            <label htmlFor="phone"> Phone :<br />
                                <div className="input-group " >
                                    <span className="btn btn-primary">+91</span>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        name="userphone"
                                        value={Userdetails.userphone}
                                        onChange={handleUserDetails}
                                        pattern="[0-9]{10}"
                                        placeholder='Your Phone...'
                                        required
                                    />

                                </div>
                            </label><br /><br />

                            <label> Password : </label><br />
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    name="userpassword"
                                    value={Userdetails.userpassword}
                                    onChange={handleUserDetails}
                                    required

                                />
                                <button className="border-0 btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div><br /><br />

                            <Link to="../purchaseforgotpassword" className="text-decoration-none custom-link">Forgot Password</Link><br />
                            <Link to="../purchasereg" className="text-decoration-none custom-link">Create a new Account</Link><br /><br />


                            <button type="submit" className=" btn btn-primary  w-100" >Login</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PurchaseLogin