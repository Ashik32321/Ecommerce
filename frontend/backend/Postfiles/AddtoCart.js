const express = require('express');
const router = express.Router();
const CartProduct = require("../Models/CartModel");

router.post('/addtocart', async (req, res) => {
    try {

        const [productId,productname, productimagePath, productprice, userId,SellerID, productquantity,productdescription] = req.body;
        const newProduct = new CartProduct({productId,productname, productimagePath, productprice, userId,SellerID, productquantity,productdescription});
        await newProduct.save();
        res.status(201)

    } catch (error) {
        console.error(error);
        res.status(500)


    }
});


module.exports = router;