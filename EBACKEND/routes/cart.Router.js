const express = require("express");
const { cartModel } = require("../models/Cart.Model");
const { verifyToken } = require("../middlewares/Authentication.middleware");
const cart_Router = express.Router();

cart_Router.post("/add", verifyToken, async (req, res) => {
  const userID = req.userID;
  const request_body = req.body;
  request_body["userID"] = userID;

  try {
    const new_item = new cartModel(request_body);
    await new_item.save();
    res.status(200).send(new_item);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

cart_Router.delete("/delete/:id", verifyToken, async (req, res) => {
  const deleteID = req.params.id;
  try {
    await cartModel.findByIdAndDelete(deleteID);
    res.status(200).send({ msg: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

cart_Router.put("/edit/:id", verifyToken, async (req, res) => {
  const updateID = req.params.id;
  const quantity = req.body.quantity;

  try {
    const update_item = await cartModel.findByIdAndUpdate(
      updateID,
      { quantity: quantity },
      { new: true }
    );
    res.status(200).send(update_item);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

cart_Router.get("/getItems", verifyToken, async (req, res) => {
  try {
    const userID = req.userID;
    const items = await cartModel.find({ userID: userID });
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { cart_Router };

