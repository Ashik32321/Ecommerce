import "bootstrap/dist/css/bootstrap.min.css"
import './CssFiles/PurchaseLoginReg.css' 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backbutton from "../../../OtherComponent/BackButton"

function PurchaseForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState(false);
  const [phonealert ,setPhoneAlert] =useState("")
    const navigate =useNavigate()
    const [value, setValue] = useState({
      phone: '',
      otp: '',
    });
    sessionStorage.setItem("resetphone",value.phone)
  
    const handleOtp = async (e) => {
      e.preventDefault();
      setdisable(true)
      setPhoneAlert("")
      if(value.phone === ""){
        setPhoneAlert("Enter PhoneNumber")
        setdisable(false)
      }
      else{
      try {
        // Make an HTTP request to the server
        const response = await axios.post('https://ecommerce-5-74uc.onrender.com/forgot-password', { phone: value.phone });
    
        if (response.status === 201) {
         
         
          
          
          alert("Otp has sent to your mobilephone")
  
          // You can add additional logic or redirection here
        } else if (response.status === 400) {
          console.log('User not registered');
          navigate("/purchasereg")
          setdisable(false)
           
        } else {
          alert('Unexpected response:');
          setdisable(false)
          // Handle other unexpected responses
        }
      } catch (error) {
        alert('unable to send otp:');
        console.log(error)
        setdisable(false)
       
        
        // Handle errors as needed
      }}
    };
    
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
     
    
      try {
        const result = await axios.post("https://ecommerce-5-74uc.onrender.com/validateotp", { ...value });
        console.log(result);
    
        if (result.data.status === "success") {
          setLoading(false)
          navigate("/purchaseresetpassword")
         
        } else if (result.data.status === "otp mismatch") {
          setLoading(false)
          alert("otp mismatch");
        } else {
          setLoading(false)
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false)
        alert("Server error");
      }
    };
    return (
        <>
        <Backbutton></Backbutton>
        <div className='login-container border mt-5 p-5 border-dark bg-white'>
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='phone' className='foem-label'>
                Phone
              </label>
              <br />
              <div className='input-group'>
                <span className='btn btn-primary'>+91</span>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  className='form-control'
                  pattern='[0-9]{10}'
                  value={value.phone}
                  onChange={(e) => setValue({ ...value, phone: e.target.value })}
                  required
                />
              </div>
              <div className="text-danger text-center">{phonealert}</div><br />
    
              <label htmlFor='otp'>Enter the OTP</label>
              <br />
              <div className='input-group'>
                <input
                  type='text'
                  name='otp'
                  id='otp'
                  className='form-control'
                  pattern='[0-9]{4}'
                  value={value.otp}
                  required
                  onChange={(e) => setValue({ ...value, otp: e.target.value })}
                />
                <button className='btn btn-primary' onClick={handleOtp} disabled={disable}>
                  Send OTP
                </button>
              </div>
              <br />
              <>
                            {loading ? (
                  
                  <button className="btn btn-secondary w-100">Loading...</button>
               ) : (
              <button type='submit' className='btn btn-primary w-100'>
                Submit
              </button>)}</>
            </form>
          </div>
        </div>
        </>
      );
    }
    
    export default PurchaseForgotPassword;
      