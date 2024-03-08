const mongoose= require("mongoose")

const ProjectSchema = new mongoose.Schema({

        userId:String ,
        username:String,
        userphone:String,
        userpassword:String,
       
 
})

const Project = mongoose.model("Register",ProjectSchema)

module.exports = Project