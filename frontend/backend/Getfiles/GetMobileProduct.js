const express = require('express');
const router =express.Router();
const Product=require("../Models/ProductModel")

router.get("/getmobileproducts", async (req, res) => {
    try {
      const mobileProducts = await Product.find({ productcategory: 'Mobile' });
      res.json(mobileProducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;