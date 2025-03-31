const express=require("express")
const cors=require("cors")
const {connection}=require("./db")
const {product_Router}=require("./routes/product_Router")
const {users_Router}=require("./routes/user_Rouer")
const { cart_Router } = require("./routes/cart.Router")
const { wishlist_Router } = require("./routes/wishlist.Router")
const { orderRouter } = require("./routes/order.Router")
const app=express();


app.use(cors())
app.use(express.json())
app.use("/products",product_Router)
app.use("/users",users_Router)
app.use("/cart",cart_Router)
app.use("/wishlist",wishlist_Router)
app.use("/order",orderRouter)


app.listen("5000",async()=>{
    await connection
    console.log("connected to db")

    console.log("Running at port no 5000")
})