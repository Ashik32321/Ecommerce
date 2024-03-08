const express = require('express');
const router = express.Router();
const Address = require("../Models/AddressModel")

router.get("/getdeliveryaddress", async (req, res) => {
    try {
        const Deliveryaddress = await Address.find();

        res.json(Deliveryaddress);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;