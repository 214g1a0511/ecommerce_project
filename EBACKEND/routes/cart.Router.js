const express = require("express");
const { cartModel } = require("../models/Cart.Model");
const { verifyToken } = require("../middlewares/Authentication.middleware");
const cart_Router = express.Router();

cart_Router.post("/add", verifyToken, async (req, res) => {
  const userID=req.userID
  const request_body=req.body;
  request_body['userID']=userID
  

  try {
    const new_item = new cartModel(request_body);
    // console.log(new_item)
    await new_item.save();
    res.status(200).send(new_item);
  } catch (error) {
    console.log(error);
    
    res.status(500).send(error);
  }
});

cart_Router.delete("/delete/:id", verifyToken, async (req, res) => {
  const deleteID = req.params.id;
  // console.log(deleteID)
  try {
    const delete_item = await cartModel.findByIdAndDelete(deleteID);
    res.status(200).send({ msg: "removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

cart_Router.put("/edit/:id", verifyToken, async (req, res) => {
  const updateID = req.params.id;
//   console.log(req.body.quantity);
//   console.log(payload)
console.log(req.body)
  const quantity = req.body.quantity;

  try {
    const update_item = await cartModel.findByIdAndUpdate(updateID, {
      quantity: quantity,
    });
    res.status(200).send({msg:"upadted quantity"})
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});



cart_Router.get("/getItems",verifyToken,async(req,res)=>{
    try {
        const items=await cartModel.find();
        console.log(items)
        res.status(200).send(items)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})

module.exports = { cart_Router };
