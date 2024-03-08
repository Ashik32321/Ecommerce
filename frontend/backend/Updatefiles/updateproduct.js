const express = require('express');
const router =express.Router();
const Product=require("../Models/ProductModel")

router.put('/updateProductValue/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      await Product.findByIdAndUpdate(_id, { productstocked: "false" });
      res.status(200).send('Product value updated successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  module.exports = router;