const express = require('express');
const router =express.Router();
const { OrderProduct } = require("../Models/OrderModel"); 


router.put('/updateProcessed/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      await OrderProduct.findByIdAndUpdate(_id, { processed: true });
      res.status(200).send('Order accepted successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.put('/updateshipped/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      await OrderProduct.findByIdAndUpdate(_id, { shipped: true });
      res.status(200).send('Order updated as shippped.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  router.put('/updatedelivered/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      await OrderProduct.findByIdAndUpdate(_id, { delivered: true });
      res.status(200).send('Order updated as shippped.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });





  module.exports = router;