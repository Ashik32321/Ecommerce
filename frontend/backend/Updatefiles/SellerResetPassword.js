const express = require('express');
const router = express.Router();
const SellerModel = require("../Models/SellerRegModel");

router.put('/sellerresetpassword', async (req, res) => {
  try {
    const { sellerphone, sellerpassword } = req.body;
   

    // Use findOneAndUpdate without explicit ObjectId conversion
    await SellerModel.findOneAndUpdate({ sellerphone }, { sellerpassword });
    
    res.status(200).send('Reset successfully.');
  } catch (error) {
    console.error('Error updating product value:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
