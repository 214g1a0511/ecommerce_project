const mongoose=require("mongoose")
const wishListSchema=new mongoose.Schema({
    "userID":{
        type:String
    },
    "title":{
        type:String,
        required:true,
    },
    "image":{
        type:String,
        required:true,
    },
    "price":{
        type:String,
        required:true,

    },
    

},{timestamps:true})

const wishlistModel=mongoose.model("wishListSchema",wishListSchema)
module.exports={wishlistModel}