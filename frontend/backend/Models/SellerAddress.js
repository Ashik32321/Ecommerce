const mongoose= require("mongoose")

const AddressSchema = new mongoose.Schema({
   
      sellerstate:String,
      sellerdistrict:String,
      sellerpincode:String,
    sellerthaluk:String,
   sellervillage:String,
   sellerId:String
    
    
     

})

const SellerAddress = mongoose.model("SellerAddress",AddressSchema)

module.exports = SellerAddress