const mongoose=require("mongoose")
const connection=mongoose.connect("mongodb+srv://bhanuchand:bhanu@cluster0.ojpug83.mongodb.net/productsDB?retryWrites=true&w=majority")



module.exports={connection}


