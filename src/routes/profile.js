const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validations");
const { validatePassword } = require("../utils/validations");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
  const { password } = req.body;
  try {
    if (validatePassword(req)) {
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = req.user;
      newUser.password = passwordHash;
      await newUser.save();
      res.send({
        message: `${newUser.firstName}, your password updated successfuly`,
      });
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
