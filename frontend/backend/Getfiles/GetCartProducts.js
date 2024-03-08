const express = require('express');
const router = express.Router();
const CartProduct = require("../Models/CartModel");


router.get('/getcartproducts', async (req, res) => {
    try {
        const cartItems = await CartProduct.find();
        res.json(cartItems)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;