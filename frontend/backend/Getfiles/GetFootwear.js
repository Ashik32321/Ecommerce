const express = require('express');
const router = express.Router();
const Product = require("../Models/ProductModel")

router.get('/getfootwearproducts', async (req, res) => {
    try {
      const  Footproducts = await Product.find({ productcategory: 'Footwear' });
      res.json( Footproducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  
module.exports = router;