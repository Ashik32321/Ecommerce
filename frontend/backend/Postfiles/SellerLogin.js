const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SellerModel = require("../Models/SellerRegModel");

const secretKey = process.env.loginsecretKey || 'your_secret_key_here'; // Use your secret key here

router.post('/sellerlogin', async (req, res) => {
    const { sellerphone, sellerpassword } = req.body;

    try {
        // Find the seller by phone number
        const user = await SellerModel.findOne({ sellerphone });

        if (user) {
            // Compare the provided password with the hashed password in the database
            const isPasswordMatch = await bcrypt.compare(sellerpassword, user.sellerpassword);

            if (isPasswordMatch) {
                // Passwords match, authentication successful

                // Create a JWT token
                const tokenPayload = { sellerId: user.sellerId, sellerphone: user.sellerphone };
                const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

                // Send the token and seller information to the client
                res.json({ status: "success", token, sellerId: user.sellerId, sellerphone: user.sellerphone });
            } else {
                // Passwords don't match
                res.json({ status: "fail", message: "Password incorrect" });
            }
        } else {
            // No user found with the provided phone number
            res.json({ status: "fail", message: "No record exists" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

module.exports = router;
