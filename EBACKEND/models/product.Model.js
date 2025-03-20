const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    "title":{
        type:String,
        required:true,
    },
    "image":{
        type:String,
        required:true,
    },
    "rating":{
        type:Number,
        required:true,
    },
    "price":{
        type:Number,
        required:true,
    },
    "category":{
        type:String,
        required:true
    }
})


const  productModel=mongoose.model("productSchema",productSchema)
module.exports={productModel}