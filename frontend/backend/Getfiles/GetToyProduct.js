const express = require('express');
const router =express.Router();
const Product=require("../Models/ProductModel")

router.get('/gettoyproducts', async (req, res) => {
    try {
      const  Toyproducts = await Product.find({ productcategory: 'Toy' });
      res.json( Toyproducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;
