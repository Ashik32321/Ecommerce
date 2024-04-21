const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/ProjectModel');

router.put('/resetpassword', async (req, res) => {
    try {
        const { userphone, userpassword } = req.body;
      
        // Hash the new password using bcrypt
        const saltRounds = 10; // Number of salt rounds for password hashing
        const hashedPassword = await bcrypt.hash(userpassword, saltRounds);

        // Update the user's password in the database
        const result = await UserModel.findOneAndUpdate(
            { userphone },
            { userpassword: hashedPassword },
            { new: true } // Return the updated document
        );

        if (result) {
            res.status(200).json({ message: 'Password reset successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
