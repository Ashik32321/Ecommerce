const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/ProjectModel');

// User registration route
router.post('/reg', async (req, res) => {
    const { userphone, userpassword, ...rest } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ userphone });

        if (existingUser) {
            // Return a response if the user already exists
            return res.status(400).json({ message: 'User already registered' });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userpassword, saltRounds);

        // Create a new user with the hashed password and other data
        const newUser = new UserModel({
            userphone,
            userpassword: hashedPassword,
            ...rest
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        // Respond with an error message
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

module.exports = router;
