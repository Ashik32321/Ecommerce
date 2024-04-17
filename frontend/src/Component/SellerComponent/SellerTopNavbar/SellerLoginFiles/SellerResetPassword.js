import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CssFiles/SellerLoginReg.css"

function SellerResetPassword() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    sellerpassword: '',
    sellercpassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const sellerphone = sessionStorage.getItem('sellerresetphone');
  const nav = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password confirmation check
    if(value.sellerpassword.length <8)
    {
      setError('Password should be 8 character.');
      return;

    }
    else if (value.sellerpassword !== value.sellercpassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {

    
  
      setLoading(true)
        const resetResponse = await axios.put('http://localhost:3001/sellerresetpassword', {
            sellerphone: sellerphone,
            sellerpassword: value.sellerpassword,
        });
  
        if (resetResponse.status === 200) {
          alert('Password Reset successfully');
          setLoading(false)
          nav('/sellerlogin', { replace: true });
        } else {
          console.error('Password reset failed:', resetResponse.data.message);
          setError('Password reset failed. Please try again.');
          setLoading(false)
        }
      
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to reset password. Please try again.');
      setLoading(false)
    }
  };
  
  return (
    <>
    <div className='login-container border mt-5 p-5 border-dark bg-white'>
      <form className='d-flex justify-content-center' onSubmit={handleSubmit}>
        <div>
          <h4 className='text-primary text-center'>Reset Password</h4>

          <label htmlFor='sellerpassword' className='form-label'>
            New Password
          </label>
          <div className='input-group'>
            <input
              className='form-control'
              type={showPassword ? 'text' : 'password'}
              name='sellerpassword'
              value={value.sellerpassword}
              onChange={(e) => setValue({ ...value, sellerpassword: e.target.value })}
              required
            />
            <button type='button' className='btn btn-primary' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <label className='form-label'>Confirm Password</label>
          <input
            type='password'
            className='form-control mb-3'
            name='sellercpassword'
            value={value.sellercpassword}
            onChange={(e) => setValue({ ...value, sellercpassword: e.target.value })}
            required
          />

          {error && <div className='text-danger mb-3'>{error}</div>}
          <>
    {loading ? (
     
     <button className="btn btn-secondary w-100">Loading...</button>
  ) : (

          <button type='submit' className='btn btn-primary w-100'>
            Submit
          </button>)}</>
        </div>
      </form>
    </div>
    </>
  );
}

export default SellerResetPassword;
