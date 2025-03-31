const express=require("express");
const { wishlistModel } = require("../models/wishlist.Model");
const { verifyToken } = require("../middlewares/Authentication.middleware");
const wishlist_Router=express.Router();

wishlist_Router.post("/add",verifyToken,async(req,res)=>{
    const userID=req.userID;
    const request_body=req.body;
    request_body["userID"]=userID
    try {
        const new_item=new wishlistModel(request_body)
        await new_item.save();
        res.status(200).send(new_item)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})




wishlist_Router.delete("/delete/:id",verifyToken,async(req,res)=>{
    const deleteID=req.params.id;
    try {
        const delete_item=await wishlistModel.findByIdAndDelete(deleteID)
        res.status(200).send({msg:"removed from wishlist"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
})
wishlist_Router.get("/getItems",verifyToken,async(req,res)=>{
    try {
        const items=await wishlistModel.find();
        res.status(200).send(items)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})


module.exports={wishlist_Router}