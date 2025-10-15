const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3500;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// Database connection
const connectDB = require("./config/db");
const mongoose = require("mongoose");
connectDB();
// parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//routes
app.use("/books", require("./routes/api/books"));
app.use("/auth", require("./routes/api/auth"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on ${PORT}`));
});
