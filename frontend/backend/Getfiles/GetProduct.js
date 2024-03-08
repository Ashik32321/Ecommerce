const express = require('express');
const router =express.Router();
const Product=require("../Models/ProductModel")

router.get('/getproducts', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;