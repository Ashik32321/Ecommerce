const mongoose= require("mongoose")

const AddressSchema = new mongoose.Schema({
    username:String,
      userphone:String,
      useraphone:String,
      userstate:String,
      userdistrict:String,
      userpincode:String,
    userthaluk:String,
    userlocality:String,
    uservillage:String,
    userhno:String,
    userId:String
    
     

})

const Address = mongoose.model("Addresses",AddressSchema)

module.exports = Address