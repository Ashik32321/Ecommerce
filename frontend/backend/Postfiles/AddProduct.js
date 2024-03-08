const express = require('express');
const router = express.Router();
const Product = require("../Models/ProductModel");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: '../public/productimage',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Express Middleware
router.use('../public/productimage', express.static("../public/productimage"));

// API to add product
router.post('/addproducts', upload.single('productimage'), async (req, res) => {
    try {
        const productId  = uuidv4(); 
        const { SellerID,productname, productdescription, productprice, productcategory,  productquantity, productstocked } = req.body;
        const newProduct = new Product({productId,SellerID,productname, productdescription, productprice, productcategory,  productquantity, productstocked});

        // Save the product data
        const savedProduct = await newProduct.save();

        // If product data saved successfully, upload the image
        if (savedProduct) {
            const productimagePath = "./productimage/" + req.file.filename;
            savedProduct.productimagePath = productimagePath;
            await savedProduct.save();
            res.status(201).json({ message: 'Product added successfully' });
        } else {
            // If product data not saved successfully, delete the uploaded image
            if (req.file) {
                const productimagePath = path.join(__dirname, '../public/productimage', req.file.filename);
                fs.unlinkSync(productimagePath);
            }
            res.status(500).json({ error: 'Failed to save product data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
