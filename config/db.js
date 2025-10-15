const mongoose = require("mongoose");
const mongoURI = process.env.DATABASE_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
