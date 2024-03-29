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
  const [loading, setLoading] = useState(false);
  let isSellerLoggedIn = false;
  const nav = useNavigate();

  // Toggle visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Create a new object without circular references
    const requestBody = {
      sellerphone: value.sellerphone,
      sellerpassword: value.sellerpassword,
    };

    try {
      setLoading(true)
      const response = await axios.post("https://ecommerce-5-74uc.onrender.com/sellerlogin", requestBody);

      if (response.data.status === "success") {
        isSellerLoggedIn = true
        sessionStorage.setItem("isSellerLoggedIn", isSellerLoggedIn);
        sessionStorage.setItem("sellerId", JSON.stringify(response.data.sellerId));
        sessionStorage.setItem("sellerphone",value.sellerphone );
       
        alert("logged in successfully")
        setLoading(false)
        nav('../sellerhome');
      } else if (response.data.status === "password incorrect") {
        alert("The password is incorrect");
        setLoading(false)
      } else {
        setLoading(false)
        alert("Invalid credentials");

      }
    } catch (error) {
      console.error(error);
      setLoading(false)
      alert("Server error");
    }
  };

  return (
    <>
    <BackButton></BackButton>
    <div className="login-container border mt-5 border-dark  bg-white">
      <div className="mt-5 mb-5">
        <h2 className="text-primary text-center">Seller Login</h2>
        <div className="d-flex justify-content-center">
          <form action="post" onSubmit={handlesubmit}>
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
            </label><br /><br />

            <label htmlFor="sellerpassword">Password:</label><br />
            <div className="input-group">
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="sellerpassword"
                value={value.sellerpassword}
                onChange={(e) => setValue({ ...value, sellerpassword: e.target.value })}
                required
              />
              <button className="border-0 btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <br /><br />
            <Link to="/sellerforgotpassword"  className="text-decoration-none custom-link">ForgotPassword</Link><br/>

            <Link to="../sellerregister"  className="text-decoration-none custom-link">Create a new Account</Link><br /><br />
            <>
    {loading ? (
     
     
       
       <button className="btn btn-secondary w-100">Loading...</button>
         
   
   
  ) : (

            <button type="submit" className="btn btn-primary w-100">Login</button>)}</>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default SellerLogin;
