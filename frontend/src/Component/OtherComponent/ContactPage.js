// src/App.js

import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const form = useRef();
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true)

    emailjs
      .sendForm('service_fbjj7bi', 'template_2j2eepg', form.current, {
        publicKey: 'uBqhTYC0dsaO6BW6B',
      })
      .then(
        () => {
          alert('Your Issue have been sent ');
          setLoading(false)
          navigate(-1)
        },
        (error) => {
          alert('Failed to send issue');
          setLoading(false)
        },
      );
  };

 

  return (
    <>
    <BackButton/>
    <div className='login-container border border-dark  mt-3 bg-white p-3'>
      
      <div className='d-flex justify-content-center'>
      <form ref={form} onSubmit={sendEmail} className='p-3'>
        <h4 className='text-primary text-center'>Contact us</h4>
      <label className='form-label'>Name</label><br/>
      <input type="text" name="Name" className='form-control'/><br/>
      <label className='form-label'>Phone</label><br/>
      <input type="tel" name="Phone" className='form-control' /><br/>
      <label className='form-label'>Problem</label><br/>
      <textarea name="Problem"  className='form-control'/><br/>
      <>
                            {loading ? (
                  
                  <button className="btn btn-secondary w-100">Loading...</button>
               ) : (
                            <button type="submit" className="btn btn-primary w-100">Submit</button>)}</>
    </form>
      
      
      </div>
    </div>
    </>
  );
}

export default ContactPage;
