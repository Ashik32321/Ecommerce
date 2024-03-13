const express = require('express');
const router = express.Router();
const Address = require("../Models/AddressModel")

router.post('/saveaddress', (req, res) => {

    Address.create(req.body)

        .then(user => {
            res.json("success")
        }
        )

        .catch(err => res.json(err))

});

module.exports = router;