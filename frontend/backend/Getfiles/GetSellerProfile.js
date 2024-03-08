const express = require('express');
const router =express.Router();
const SellerModel =require("../Models/SellerRegModel");

router.get('/getsellerprofile', async (req, res) => {
    try {
      const profile = await SellerModel.find();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;