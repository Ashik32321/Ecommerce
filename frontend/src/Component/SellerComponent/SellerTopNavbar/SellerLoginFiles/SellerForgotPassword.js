import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CssFiles/SellerLoginReg.css"
import BackButton from "../../../OtherComponent/BackButton";
function SellerForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [value, setValue] = useState({
    phone: Number,
    otp: '',
  });
  sessionStorage.setItem("sellerresetphone", value.phone)

  const handleOtp = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP request to the server
      const response = await axios.post('https://ecommerce-5-74uc.onrender.com/sellerforgot-password', { phone: value.phone });

      if (response.status === 201) {




        alert("Otp has sent to your mobilephone")

        // You can add additional logic or redirection here
      } else if (response.status === 400) {
        console.log('User not registered');
        navigate("/sellerregister")

      } else {
        alert('Unexpected response:');
        // Handle other unexpected responses
      }
    } catch (error) {
      alert('unable to send otp:');
      console.log(error)

      // Handle errors as needed
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const result = await axios.post("https://ecommerce-5-74uc.onrender.com/sellervalidateotp", { ...value });
      console.log(result);

      if (result.data.status === "success") {
        setLoading(false)
        navigate("/sellerresetpassword")

      } else if (result.data.status === "otp mismatch") {

        alert("otp mismatch");
        setLoading(false)

      } else {
        alert("Invalid credentials");
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
      setLoading(false)
    }
  };

  return (
    <>
      <BackButton />
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
            <br />

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
              <button className='btn btn-primary' onClick={handleOtp}>
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

export default SellerForgotPassword;
