const express = require('express');
const router = express.Router();
const { OrderProduct } = require("../Models/OrderModel");

router.post('/orders', async (req, res) => {
  try {
    const orderDetails = req.body;

    // Save each product individually
    for (const product of orderDetails.products) {
      const newOrderProduct = new OrderProduct({
        modeofpayment: orderDetails.modeofpayment,
        orderid: orderDetails.orderid,
        processed: orderDetails.processed,
        shipped: orderDetails.shipped,
        delivered: orderDetails.delivered,
        products: [product],
      } );

      await newOrderProduct.save();
    }

    res.json({ message: 'Order details and products successfully saved.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
