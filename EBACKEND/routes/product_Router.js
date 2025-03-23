const express = require("express");
const product_Router = express.Router();
const multer = require("multer");
const { productModel } = require("../models/product.model");
const { imageUpload } = require("../helper_functions/imageUpload");
const { verifyToken } = require("../middlewares/Authentication.middleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

product_Router.post("/upload", upload.single("img"), async (req, res) => {
  const request_body = req.body;
  console.log(request_body);
  try {
    if (!req.file) {
      return res.status(400).send({ msg: "no file found!!" });
    }

    try {
      const imageBuffer = req.file.buffer;
      const base64Image = imageBuffer.toString("base64");
      const image = await imageUpload(base64Image);
      request_body["image"] = image;
      console.log(request_body);
      const new_product = new productModel(request_body);
      await new_product.save();
      res.status(200).send({ msg: "added product" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

product_Router.get("/getProducts", verifyToken, async (req, res) => {
  try {
    const products = await productModel.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});

product_Router.get("/getCategoryProducts", verifyToken, async (req, res) => {
  const category = req.query.category;
  try {
    const category_products = await productModel.find({ category });
    // console.log(category_products)
    res.status(200).send(category_products);
  } catch (error) {
    return res.status(500).send(error);
  }
});

product_Router.get("/sortByPrice/:type", verifyToken, async (req, res) => {
  const type = req.params.type;
  try {
    if (type === "low-to-high") {
      const items = await productModel.find().sort({ price: 1 });
    //   console.log(items);
    res.status(200).send(items)
    }
    else if(type==="high-to-low"){
        const items = await productModel.find().sort({ price: -1 });
    //   console.log(items);
    res.status(200).send(items)


    }
    else{
        return res.status(500).send({msg:`This ${type} option not available`})
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});




product_Router.get("/sortByRating/:type",verifyToken,async(req,res)=>{
    const type=req.params.type;
    try {
        if(type==="low-to-high"){
            const items=await productModel.find().sort({rating:1})
            // console.log(items)
            res.status(200).send(items)
        }
        else if(type==="high-to-low"){
            const items=await productModel.find().sort({rating:-1})
            // console.log(items)
            res.status(200).send(items)
        }
        else{
            return res.status(500).send({msg:`This ${type} option not available`})
        }
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})

product_Router.get("/search/:keyword",verifyToken,async(req,res)=>{
    const keyword=req.params.keyword;
    try {
        let regex = new RegExp(`^${keyword}`);

        const items=await productModel.find({title:{ $regex: regex } })
        // console.log(items)
        if(items.length===0){
            return res.status(400).send({msg:"Product not Found"})
        }
        res.status(200).send(items)
        
    } catch (error) {
        res.status(500).send(error)
        
    }

})



module.exports = { product_Router };
