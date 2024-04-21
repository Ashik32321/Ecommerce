import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backbutton from "../../../OtherComponent/BackButton";

function SellerForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [phoneAlert, setPhoneAlert] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Initial time left for OTP validity
  const navigate = useNavigate();
  const [value, setValue] = useState({
    phone: '',
  });

  useEffect(() => {
    // Countdown timer for OTP validity
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          setOtpSent(false);
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [otpSent]);

  const handleOtp = async (e) => {
    e.preventDefault();
    setDisable(true);
    setPhoneAlert("");

    if (value.phone === "") {
      setPhoneAlert("Enter PhoneNumber");
      setDisable(false);
    } else {
      try {
        // Make an HTTP request to the server
        const response = await axios.post('http://localhost:3001/sellerforgot-password', { phone: value.phone });

        if (response.status === 201) {
          setOtpSent(true);
          setTimeLeft(60); // Reset timer
          alert("OTP has been sent to your mobile phone");
        } else if (response.status === 400) {
          console.log('User not registered');
          navigate("/seller-register");
        } else {
          alert('Unexpected response:');
        }
      } catch (error) {
        alert('Unable to send OTP');
        console.log(error);
      } finally {
        setDisable(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post("http://localhost:3001/sellervalidateotp", {phone: value.phone , otp });
      console.log(result);

      if (result.data.status === "success") {
        setLoading(false);
        sessionStorage.setItem("resetphone",value.phone )
        navigate("/sellerresetpassword");
      } else if (result.data.status === "otp mismatch") {
        setLoading(false);
        alert("OTP mismatch");
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
      <div className='login-container border mt-5 p-5 border-dark bg-white'>
        <div className='d-flex justify-content-center'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='phone' className='form-label'>Phone</label>
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
            <div className="text-danger text-center">{phoneAlert}</div><br />

            {otpSent && (
              <>
                <label htmlFor='otp'>Enter the OTP</label>
                <br />
                <div className='input-group'>
                  <input
                    type='text'
                    name='otp'
                    id='otp'
                    className='form-control'
                    pattern='[0-9]{4}'
                    value={otp}
                    required
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <br />
              </>
            )}

            {otpSent ? (
              <>
              <p className="text-center">
                <div className="text-center">Time left: {timeLeft} seconds</div>
                <button type='submit' className='btn btn-primary w-100 ' disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
                </p>
              </>
            ) : (
              <p className="text-center">
              <button className='btn btn-primary text-center' onClick={handleOtp} disabled={disable}>{disable ? "Sending OTP..." : "Send OTP"}</button>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SellerForgotPassword;
