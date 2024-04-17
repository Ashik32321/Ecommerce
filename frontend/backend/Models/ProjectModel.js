const mongoose= require("mongoose")

const BuyerSchema = new mongoose.Schema({

        userId:String ,
        username:String,
        userphone:String,
        userpassword:String,
       
 
})

const Buyer = mongoose.model("Register",BuyerSchema)

module.exports = Buyer