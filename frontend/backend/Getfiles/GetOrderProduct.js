const express = require('express');
const router =express.Router();
const { OrderProduct } = require("../Models/OrderModel");

router.get('/getorderproducts', async (req, res) => {
    try {
      const orderproducts = await OrderProduct.find();
     
      res.json(orderproducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;