const express = require("express");
const sendEmail = require("../helper_functions/sendMail");
const { verifyToken } = require("../middlewares/Authentication.middleware");
const orderRouter = express.Router();

orderRouter.post("/place-order", async (req, res) => {
  try {
    console.log("Received order details:", req.body);  
    let { customerInfo, cartItems, totalPrice } = req.body;

    if (!Array.isArray(cartItems)) {
      cartItems = [cartItems];  
    }

    await sendEmail(customerInfo, cartItems, totalPrice);
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = {orderRouter};
