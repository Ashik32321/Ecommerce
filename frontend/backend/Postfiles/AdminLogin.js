const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get the admin credentials and secret key from environment variables
const savedAdminEmail = process.env.SAVED_ADMIN_EMAIL;
const savedAdminPassword = process.env.SAVED_ADMIN_PASSWORD;
const secretKey = process.env.loginsecretKey; // Secret key for signing the token

// Admin login route
router.post('/adminlogin', (req, res) => {
    const { adminemail, adminpassword } = req.body;
    
    // Check if admin credentials match with saved credentials
    if (savedAdminEmail === adminemail && savedAdminPassword === adminpassword) {
        // Create a JWT token with the admin email as the payload and sign it with the secret key
        const token = jwt.sign({ adminEmail: adminemail }, secretKey, {
            expiresIn: '1h' // Token expires in 1 hour (you can adjust this as needed)
        });
        
        // Send success response with the token
        res.json({ status: 'success', token });
    } else {
        // If credentials don't match, send appropriate error response
        if (savedAdminEmail !== adminemail) {
            res.json({ status: 'emailIncorrect' }); // Incorrect admin email
        } else {
            res.json({ status: 'passwordIncorrect' }); // Incorrect admin password
        }
    }
});

router.post('/adminlogout', (req, res) => {
    try {
        // Invalidate the token or end the session
        const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: 'error', message: 'Invalid token' });
            }

            res.json({ status: 'success' });
        });

    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});
 

module.exports = router;
