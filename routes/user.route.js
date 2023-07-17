const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config();
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "user already registered" });
    } else {
      bcrypt.hash(req.body.password, 10, async (error, hash) => {
        if (hash) {
          const newUser = new UserModel({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "user register sucessFully" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id }, "kamran");
          res.status(200).json({ msg: "user logged in Sucessfully", token });
        } else {
          res.status(200).json({ msg: "Incorrect Password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = {userRouter};