// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/contact', { name, email, problem });
      setMessage('Your problem has been submitted successfully. We will get back to you soon.');
      setName('');
      setEmail('');
      setProblem('');
    } catch (error) {
      console.error('Error submitting problem:', error);
      setMessage('Failed to submit the problem. Please try again later.');
    }
  };

  return (
    <div className='container-fluid bg-white'>
      <h6 className='text-primary'><u>Contact Us</u></h6>
      <form onSubmit={handleSubmit} className='p-3'>
        <div>
          <label className='form-label'>Name</label><br/>
          <input className='form-input' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className='form-label'>Email:</label><br/>
          <input className='form-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className='form-label'>Problem:</label><br/>
          <textarea  className='form-input' value={problem} onChange={(e) => setProblem(e.target.value)} required />
        </div>
        <button type="submit" className='btn btn-primary '>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ContactPage;
