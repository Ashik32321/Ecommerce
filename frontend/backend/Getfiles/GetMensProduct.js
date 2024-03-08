const express = require('express');
const router = express.Router();
const Product = require("../Models/ProductModel")

router.get('/getmensproducts', async (req, res) => {
    try {
        const Mensproducts = await Product.find({ productcategory: 'Menswear' });
        res.json(Mensproducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;