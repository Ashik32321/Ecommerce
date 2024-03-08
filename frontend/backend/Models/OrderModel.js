const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  modeofpayment: String,
  orderid: String,
  processed: Boolean,
  shipped: Boolean,
  delivered: Boolean,
  products: [
    {
      productId: String,
      SellerID: String,
      productname: String,
      productprice: Number,
      productdescription: String,
      productcategory: String,
      productimagePath: String,
      productquantity: Number,
    },
  ],
});

const OrderProduct = mongoose.model('OrderProduct', orderProductSchema);

module.exports = { OrderProduct };
