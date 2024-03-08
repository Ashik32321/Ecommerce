const mongoose= require("mongoose")

const ProductSchema = new mongoose.Schema({
    productId:String,
    productname:String,
    productprice:Number,
    productdescription:String,
    productcategory:String,
    productimagePath:String,
    userId:String,
    SellerID:String,
    productquantity:Number,
   
    

})

const CartProduct = mongoose.model("CartProducts",ProductSchema)

module.exports = CartProduct