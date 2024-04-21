import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CssFiles/SellerLoginReg.css';
import BackButton from '../../../OtherComponent/BackButton';

function SellerForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [phoneAlert, setPhoneAlert] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: '',
        otp: ''
    });

    // Store phone in session storage for later use
    sessionStorage.setItem('sellerresetphone', formData.phone);

    // Handler for sending OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setDisable(true);

        // Validate phone number
        if (!formData.phone) {
            setPhoneAlert('Enter a valid phone number');
            setDisable(false);
            return;
        } else {
            setPhoneAlert('');
        }

        try {
            const response = await axios.post('https://ecommerce-5-74uc.onrender.com/sellerforgot-password', { phone: formData.phone });
            if (response.status === 201) {
                alert('OTP has been sent to your mobile phone');
            } else if (response.status === 400) {
                console.log('User not registered');
                navigate('/sellerregister');
            } else {
                alert('Unexpected response from server');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Unable to send OTP');
        } finally {
            setDisable(false);
        }
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://ecommerce-5-74uc.onrender.com/sellervalidateotp', formData);
            if (response.data.status === 'success') {
                navigate('/sellerresetpassword');
            } else if (response.data.status === 'otp mismatch') {
                alert('OTP mismatch');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Handler for form data changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <BackButton />
            <div className='login-container border mt-5 p-5 border-dark bg-white'>
                <div className='d-flex justify-content-center'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='phone' className='form-label'>Phone</label>
                        <div className='input-group'>
                            <span className='btn btn-primary'>+91</span>
                            <input
                                type='tel'
                                name='phone'
                                id='phone'
                                className='form-control'
                                pattern='[0-9]{10}'
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='text-danger text-center'>{phoneAlert}</div><br />

                        <label htmlFor='otp'>Enter the OTP</label>
                        <div className='input-group'>
                            <input
                                type='text'
                                name='otp'
                                id='otp'
                                className='form-control'
                                pattern='[0-9]{4}'
                                value={formData.otp}
                                required
                                onChange={handleInputChange}
                            />
                            <button
                                className='btn btn-primary'
                                disabled={disable}
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </button>
                        </div>

                        <br />
                        {loading ? (
                            <button type='submit' className='btn btn-secondary w-100' disabled>Loading...</button>
                        ) : (
                            <button type='submit' className='btn btn-primary w-100'>Submit</button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default SellerForgotPassword;
