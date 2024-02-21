const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const checkEmail = await UserModel.find({ email: email });

    if (checkEmail.length > 0) {
      return res.status(409).json({
        message:
          "This email is already registered. Please try using a different email.",
      });
    }

    if (!email || !password || !name) {
      return res.status(400).send("All fields are required");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const userData = new UserModel({
        email,
        password: hash,
        name,
      });

      const saveUserData = await userData.save();
      res.status(201).send({
        message: "Successfully registered",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to register" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await UserModel.find({ email: email });

    if (checkEmail.length === 0) {
      return res.status(404).send({ message: "This email does not exist" });
    }
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    } else {
      const check = bcrypt.compareSync(password, checkEmail[0].password);
      if (check) {
        const token = jwt.sign(
          { uniqueId: checkEmail[0]._id, emailId: checkEmail[0].email },
          process.env.SECRET_KEY
        );
        res.status(200).send({
          token: token,
          userData: checkEmail[0],
          message: "Login successful",
        });
      } else {
        return res.status(401).send({ message: "Password mismatch" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in login route");
  }
});

module.exports = {
  userRouter,
};
