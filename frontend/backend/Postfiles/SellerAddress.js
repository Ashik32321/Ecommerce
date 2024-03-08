const express = require('express');
const router =express.Router();
const SellerAddress=require("../Models/SellerAddress")


router.post('/selleraddress',  (req, res) => {
     
  
    SellerAddress.create(req.body)
    .then(
          res.json("added successfully")
    )
     .catch(err => res.json(err))
  
    });

 module.exports = router;