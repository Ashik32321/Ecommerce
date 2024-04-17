const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const SellerModel = require("../Models/SellerRegModel");

router.put('/sellerresetpassword', async (req, res) => {
    try {
        const { sellerphone, sellerpassword } = req.body;

        // Hash the new password using bcrypt
        const saltRounds = 10; // Number of salt rounds for password hashing
        const hashedPassword = await bcrypt.hash(sellerpassword, saltRounds);

        // Update the seller's password in the database
        const result = await SellerModel.findOneAndUpdate(
            { sellerphone },
            { sellerpassword: hashedPassword },
            { new: true } // Return the updated document
        );

        if (result) {
            res.status(200).json({ message: 'Password reset successfully.' });
        } else {
            res.status(404).json({ message: 'Seller not found.' });
        }
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
