const express = require('express');
const router =express.Router();
const Product=require("../Models/ProductModel")

router.get('/getwomensproducts', async (req, res) => {
    try {
      const  Womensproducts = await Product.find({ productcategory: 'Womenswear' });
      res.json( Womensproducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;
