import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import BackButton from "../../../OtherComponent/BackButton"

function SellerLogin() {
  const [value, setValue] = useState({
    sellerphone: "",
    sellerpassword: "",
  });
  const [errors, setErrors] = useState({
    sellerphone: "",
    sellerpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Toggle visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate phone
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(value.sellerphone)) {
      newErrors.sellerphone = "Invalid phone number";
      isValid = false;
    }

    // Validate password
    if (value.sellerpassword.trim() === "") {
      newErrors.sellerpassword = "Password shouldn't be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
        return;
    }

    // Prepare the request body
    const requestBody = {
        sellerphone: value.sellerphone,
        sellerpassword: value.sellerpassword,
    };

    try {
        // Set loading state to true
        setLoading(true);
        
        // Send the login request to the backend
        const response = await axios.post("http://localhost:3001/sellerlogin", requestBody);

        // Check the status of the response
        if (response.data.status === "success") {
            // On successful login, store the token and other data in session storage
            const token = response.data.token; // Get the token from the response
            sessionStorage.setItem("sellerId", JSON.stringify(response.data.sellerId));
            sessionStorage.setItem("sellerphone", value.sellerphone);
            sessionStorage.setItem("sellertoken", JSON.stringify(token)); // Store the token in session storage
            
            // Display a success alert
            alert("Logged in successfully");
            
            // Reset loading state
            setLoading(false);
            
            // Navigate to the seller home page
            nav('../sellerhome');
        } else if (response.data.status === "password incorrect") {
            // Display an alert if the password is incorrect
            alert("The password is incorrect");
            setLoading(false);
        } else {
            // Display an alert if the credentials are invalid
            alert("Invalid credentials");
            setLoading(false);
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        setLoading(false);
        alert("Server error");
    }
};

  return (
    <>
      <BackButton />
      <div className="login-container border mt-5 border-dark bg-white">
        <div className="mt-5 mb-5">
          <h2 className="text-primary text-center">Seller Login</h2>
          <div className="d-flex justify-content-center">
            <form onSubmit={handlesubmit}>
              <label htmlFor="sellerphone">Phone:<br />
                <div className="input-group">
                  <span className="btn btn-primary">+91</span>
                  <input
                    className="form-control"
                    type="tel"
                    name="sellerphone"
                    value={value.sellerphone}
                    onChange={(e) => setValue({ ...value, sellerphone: e.target.value })}
                    pattern="[0-9]{10}"
                    placeholder="Your Phone..."
                    required
                    
                  />
                </div>
                {errors.sellerphone && (
                  <div className='text-danger'>{errors.sellerphone}</div>
                )}
              </label><br /><br />

              <label htmlFor="sellerpassword">Password:</label><br />
              <div className="input-group">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  name="sellerpassword"
                  value={value.sellerpassword}
                  onChange={(e) => setValue({ ...value, sellerpassword: e.target.value })}
                  
                />
                <button className="border-0 btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.sellerpassword && (
                <div className='text-danger'>{errors.sellerpassword}</div>
              )}

              <br /><br />
              <Link to="/sellerforgotpassword" className="text-decoration-none custom-link">ForgotPassword</Link><br />

              <Link to="../sellerregister" className="text-decoration-none custom-link">Create a new Account</Link><br /><br />

              {loading ? (
                <button className="btn btn-secondary w-100">Loading...</button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">Login</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerLogin;
