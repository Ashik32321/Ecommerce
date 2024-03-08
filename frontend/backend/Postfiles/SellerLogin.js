const express = require('express');
const router = express.Router();
const SellerModel = require("../Models/SellerRegModel");

router.post('/sellerlogin', (req, res) => {
  const { sellerphone, sellerpassword } = req.body;

  SellerModel.findOne({ sellerphone: sellerphone })
    .then(user => {
      if (user) {
        if (user.sellerpassword === sellerpassword) {
          res.json({ status: "success", sellerId: user.sellerId,sellerphone:user.sellerphone });
        } else {
          res.json({ status: "password incorrect" });
        }
      } else {
        res.json({ status: "no record exist" });
      }
    })
    .catch(err => res.json(err));
});

module.exports = router;
