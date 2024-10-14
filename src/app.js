const express = require("express");
const connectDB = require("./config/database");
const app = new express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// app.get("/user", async (req, res) => {
//   const email = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: email });
//     if (user === 0) {
//       res.send(
//         "There is not any emailId that matches with the requested one.."
//       );
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

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
