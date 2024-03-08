const mongoose= require("mongoose")

const ProductSchema = new mongoose.Schema({
    productId:String,
    SellerID:String,
    productname:String,
    productprice:Number,
    productdescription:String,
    productcategory:String,
    productimagePath:String,
    productquantity:Number,
    productstocked:Boolean,
    isprocessed:Boolean,
    isshipped:Boolean,
    isdelivered:Boolean,
     

})

const Product = mongoose.model("Products",ProductSchema)

module.exports = Product