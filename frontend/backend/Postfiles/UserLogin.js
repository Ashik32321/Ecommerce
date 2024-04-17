const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/ProjectModel'); // Adjust the path to your user model file
const jwt = require('jsonwebtoken');
require('dotenv').config();
const loginsecretKey = process.env.loginsecretKey; // Choose a secure secret key and keep it private

router.post('/login', async (req, res) => {
    const { userphone, userpassword } = req.body;

    try {
        // Find the user by phone number
        const user = await UserModel.findOne({ userphone });

        if (user) {
            // Compare the provided password with the hashed password in the database
            const isPasswordMatch = await bcrypt.compare(userpassword, user.userpassword);

            if (isPasswordMatch) {
                // Passwords match, authentication successful

                // Create a JWT token
                const token = jwt.sign({ userId: user.userId }, loginsecretKey, { expiresIn: '1h' });

                // Send the token to the client
                res.json({ status: 'success', token, userId: user.userId });
            } else {
                // Passwords don't match
                res.json({ status: 'passwordIncorrect' });
            }
        } else {
            // No user found with the provided phone number
            res.json({ status: 'noRecordExist' });
        }
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error during login:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
