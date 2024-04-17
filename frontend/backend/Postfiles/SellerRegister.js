const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const SellerModel = require("../Models/SellerRegModel");

// Configure storage for file uploads
const storage1 = multer.diskStorage({
  destination: '../public/sellerlogo',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload1 = multer({ storage: storage1 });

router.post('/sellerregister', upload1.single('sellerlogo'), async (req, res) => {
    const { sellerphone, sellerpassword, sellername, sellershopname, sellergst, sellerId, totalsales } = req.body;

    try {
        // Check if seller already exists
        const existingSeller = await SellerModel.findOne({ sellerphone });
        if (existingSeller) {
            return res.status(409).json({ status: 'fail', message: 'Seller already registered' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(sellerpassword, saltRounds);

        // Create a new seller
        const newSeller = new SellerModel({
            sellerphone,
            sellerpassword: hashedPassword,
            sellername,
            sellershopname,
            sellergst,
            sellerId,
            totalsales,
        });

        // Handle file upload
        if (req.file) {
            newSeller.sellerlogopath = `./sellerlogo/${req.file.filename}`;
        }

        // Save the new seller to the database
        await newSeller.save();
        return res.status(201).json({ status: 'success', message: 'Seller registered successfully', data: newSeller });
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ status: 'error', message: 'Internal server error', details: err.message });
    }
});

module.exports = router;
