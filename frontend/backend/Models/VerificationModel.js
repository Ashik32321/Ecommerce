const mongoose= require("mongoose")

const SellerSchema = new mongoose.Schema({
    phone:Number,
    otp: String,
   

     

})

const PasswordUpdate = mongoose.model("PasswordUpdate",SellerSchema)

module.exports = PasswordUpdate