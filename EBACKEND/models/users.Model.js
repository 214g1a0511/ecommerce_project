const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    userID:{
        type:String,

    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

},{timestamps:true})



const usersModel=mongoose.model("userSchema",userSchema)

module.exports={usersModel}