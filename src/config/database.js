const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://utkarshgandhi402:ESPJWj7szLQeIIVK@namastedev.nnd9m.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
