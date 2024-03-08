const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
    sellerId: { type: String, index: true },
    sellername: String,
    sellershopname: String,
    sellerphone: String,
    sellergst: String,
    sellerpassword: String,
    sellerlogopath: String,
    totalsales: Number
});

const SellerModel = mongoose.model("sellerregisters", SellerSchema);

module.exports = SellerModel;
