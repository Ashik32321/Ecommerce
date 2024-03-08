const express = require('express');
const router = express.Router();
const SellerModel = require("../Models/SellerRegModel");

router.put('/updatedsalesvalue/:sellerphone', async (req, res) => {
    try {
        const { totalsales } = req.body;
        const sellerphone = req.params.sellerphone;
        console.log(totalsales);
        

        // Use findOne instead of find to get a single document
        const user = await SellerModel.findOne({sellerphone:sellerphone});

        if (user) {
            // Update the document with the specified sellerId
            await SellerModel.findOneAndUpdate({ sellerphone}, { totalsales });
           

            res.status(200).send('totalsales updated.');
            console.log('totalsales updated.');
        } else {
            // If the user is not found, return a 404 status
            res.status(404).send('User not found.');
            console.log('User not found.')
        }

    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
        console.log(error.message)
    }
});

module.exports = router;
