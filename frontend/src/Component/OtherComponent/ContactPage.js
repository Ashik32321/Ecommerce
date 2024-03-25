// src/App.js

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import BackButton from './BackButton';

function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_fbjj7bi', 'template_2j2eepg', form.current, {
        publicKey: 'uBqhTYC0dsaO6BW6B',
      })
      .then(
        () => {
          console.log('Your Issue have been sent ');
        },
        (error) => {
          console.log('Failed to send issue', error.text);
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
      <input type="submit" value="Submit" className='btn btn-primary w-100'/>
    </form>
      
      
      </div>
    </div>
    </>
  );
}

export default ContactPage;
