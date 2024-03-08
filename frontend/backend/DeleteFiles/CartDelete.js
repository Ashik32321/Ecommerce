const express = require('express');
const router = express.Router();
const CartProduct = require("../Models/CartModel");

router.delete('/remove/:_id', async (req, res) => {
    try {
        console.log(req.params._id);
      const deletedItem = await CartProduct.findByIdAndDelete(req.params._id);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;