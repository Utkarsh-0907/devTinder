const express = require("express");

const app = new express();

app.use("/home", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.use("/test", (req, res) => {
  res.send("Welcome to the Testing Page");
});

app.use("/", (req, res) => {
  res.send("Welcome to the Dashboard");
});

app.listen(7700, () => {
  console.log("Server is started");
});
