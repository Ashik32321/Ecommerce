const mongoose = require('mongoose');




const connectDb =async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Project");
        console.log("connection successfull to Database");
    }
    catch(error){
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports=connectDb