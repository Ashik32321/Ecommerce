//Getsearch .js

const express = require('express');
const router = express.Router();
const Product = require('../Models/ProductModel');

router.get('/search', async (req, res) => {
  const query = req.query.q;
  console.log(req.query.q);

  try {
    const items = await Product.find({ productname: { $regex: new RegExp(query, 'i') } });

    if (items.length === 0) {
      return res.json([]); // or res.json({ message: 'No matching products found.' });
    }

    
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
