const express = require("express");
const { validateSignUpData } = require("../utils/validations.js");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const userObj = req.body;

  try {
    // Validate the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully...");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("This user is not in the DB");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);

      res.send("Login Successful!!");
    } else {
      throw new Error("Password is not Valid!");
    }
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

module.exports = authRouter;
