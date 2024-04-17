const express = require('express');
const router = express.Router();
const CartProduct = require("../Models/CartModel");

router.post('/addtocart', async (req, res) => {
    try {
        const { productId, productname, productimagePath, productprice, userId, SellerID, productquantity, productdescription } = req.body;
        
        // Create a new cart product
        const newProduct = new CartProduct({ productId, productname, productimagePath, productprice, userId, SellerID, productquantity, productdescription });
        
        // Save the new cart product to the database
        await newProduct.save();

        // Respond with a status of 201 (created) and a success message
        res.status(201).json({ status: 'success', message: 'Item added successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        // Respond with a status of 500 (internal server error) and an error message
        res.status(500).json({ status: 'error', message: 'An error occurred while adding the product to the cart' });
    }
});

module.exports = router;
