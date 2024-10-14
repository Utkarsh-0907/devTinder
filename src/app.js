const express = require("express");
const connectDB = require("./config/database");
const app = new express();
const User = require("./models/user");
const validate = require("validator");
const { validateSignUpData } = require("./utils/validations.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.find({ emailId: email });
    if (user === 0) {
      res.send(
        "There is not any emailId that matches with the requested one.."
      );
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected...");
    app.listen(7700, () => {
      console.log("Server is started");
    });
  })
  .catch((err) => {
    console.log("Error Occured during connection!" + err);
  });
