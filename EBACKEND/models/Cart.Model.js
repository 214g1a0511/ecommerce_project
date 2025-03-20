const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
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
    "quantity":{
        type:Number,
        required:true,
    }

},{timestamps:true})

const cartModel=mongoose.model("cartSchema",cartSchema)
module.exports={cartModel}

