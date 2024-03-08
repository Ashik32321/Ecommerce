const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SellerModel = require("../Models/SellerRegModel");


const storage1 = multer.diskStorage({
  destination: '../public/Sellerlogo',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload1 = multer({ storage: storage1 });
router.use('../public/sellerlogo', express.static("../public/sellerlogo"));

router.post('/sellerregister', upload1.single('sellerlogo'), async (req, res) => {
  const { sellerphone } = req.body;

  try {
    const user = await SellerModel.findOne({ sellerphone: sellerphone });

    if (user) {
      return res.json("user already registered");
    } else {
      const { sellername, sellershopname, sellergst, sellerpassword,sellerId,totalsales  } = req.body;
     
      
      const sellerlogopath = "./sellerlogo/" + req.file.filename;

      const newProduct = new SellerModel({
        sellerId,
        sellername,
        sellershopname,
        sellerphone,
        sellergst,
        sellerpassword,
        sellerlogopath,
        totalsales
      });

      await newProduct.save();
      res.json("user registered successfully");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
