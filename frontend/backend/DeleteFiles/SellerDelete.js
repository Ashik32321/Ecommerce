const express = require('express');
const router = express.Router();
const Product = require("../Models/ProductModel");
const fs = require('fs');
const path = require('path');

router.delete('/removesellerproduct/:_id', async (req, res) => {
    try {
        const deletedItem = await Product.findByIdAndDelete(req.params._id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the uploaded image if exists
        if (deletedItem.imagePath) {
            const fullPath = path.join(__dirname, '..', 'public', deletedItem.imagePath);
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error(`Error deleting image file: ${err}`);
                    res.status(500).json({ error: 'Error deleting image file' });
                } else {
                    console.log('Image file deleted successfully');
                    res.json({ message: 'Item deleted successfully' });
                }
            });
        } else {
            // No image path provided, only delete from database
            res.json({ message: 'Item deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
