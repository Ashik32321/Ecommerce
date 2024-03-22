// contactRoutes.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const email = process.env.email;
const password = process.env.password;
const supportEmail = process.env.supportEmail;

router.post('/contact', (req, res) => {
    const { name, phone, problem } = req.body;
  
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email, // replace with your email
        pass: password // replace with your password
      }
    });
  
    // Email message options
    const mailOptions = {
      from: email, // replace with your email
      to: supportEmail, // replace with your support email
      subject: 'Customer Problem',
      text: `Name: ${name}\nPhone: ${phone}\nProblem: ${problem}`
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
});

module.exports = router;
