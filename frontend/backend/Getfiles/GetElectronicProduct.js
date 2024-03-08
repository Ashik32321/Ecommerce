const express = require('express');
const router = express.Router();
const Product = require("../Models/ProductModel")


router.get('/getelectronicproducts', async (req, res) => {
    try {
      const  Electronicproducts = await Product.find({ productcategory: 'Electronic' });
      res.json( Electronicproducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;