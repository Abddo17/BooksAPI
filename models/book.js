const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  genre: String,
  available: Boolean,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
