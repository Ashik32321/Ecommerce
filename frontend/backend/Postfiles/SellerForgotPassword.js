const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();
const PasswordUpdate = require('../Models/VerificationModel');
const SellerModel = require("../Models/SellerRegModel");

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

router.post('/sellerforgot-password', async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const phone = req.body.phone;
    console.log(phone)

 
    
   

    // Check if the user is registered in the Project model
    const user = await SellerModel.findOne({ sellerphone:phone });

    if (user) {
      // Find user by phone number in the PasswordUpdate model
      const existingUser = await PasswordUpdate.findOne({ phone });

      if (existingUser) {
        await PasswordUpdate.findByIdAndUpdate(existingUser._id, { otp });
      
        // Send OTP via Twilio SMS
        const twilioResponse = await twilioClient.messages.create({
          body: `Your OTP is: ${otp}`,
          from: TWILIO_PHONE_NUMBER,
          to: `+91${phone}`,
        });
        
     
        res.status(201).json({ message: 'Password reset successful' });
      } else {
        // Use await and handle errors for the create operation
        try {
          await PasswordUpdate.create({ phone, otp });
          const twilioResponse = await twilioClient.messages.create({
            body: `Your OTP is: ${otp}`,
            from: TWILIO_PHONE_NUMBER,
            to: `+91${phone}`,
          });
          res.status(201).json({ message: 'Password reset successful' });
        } catch (createError) {
          console.error('Error creating PasswordUpdate:', createError);
          res.status(500).json({ message: 'Failed to create PasswordUpdate' });
        }
      }
    } else {
      res.status(400).json({ message: 'You are not registered' });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Failed to send OTP via SMS' });
  }
});





router.post('/sellervalidateotp', (req, res) => {
  const { phone, otp} = req.body;

  PasswordUpdate.findOne({ phone: phone })
      .then(user => {
          if (user) {
              if (user.otp === otp) {
                  // Include userId in the response
                  res.json({ status: "success", userId: user.userId });
              } else {
                  res.json({ status: "otp mismatch" });
              }
          } else {
              res.json({ status: "userNotFound" });
          }
      })
      .catch(err => res.json({ status: "error", error: err }));
});



module.exports = router;
