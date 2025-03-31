const express = require("express");
const users_Router = express.Router();
const { usersModel } = require("../models/users.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateID } = require("../generateIDS/generateID");

users_Router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userID = generateID();
    if (!username || !email || !password) {
      return res.status(400).send('Username, email, and password are required');
    }
    const user_exists=await usersModel.find({email:{$exists:true}})
    console.log("user",user_exists)
    if(user_exists.email===email){
      return res.status(400).send({msg:"user already exists!!"})
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      const new_user = new usersModel({
        userID: userID,
        username,
        email,
        password: hash,
      });
      console.log(new_user);
      await new_user.save();
      res.status(200).send({ msg: "Registered !!" });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

users_Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await usersModel.findOne({ email });
    console.log(user.userID);
    if (!user) {
      return res.send({ msg: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userID: user.userID, email: email }, "bhanu");
      console.log(token);
      return res.send({ msg: "Login Successful",token });
    }
    console.log("userID", user.userID);

    return res.send({ msg: "Invaild Credentials" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = { users_Router };
