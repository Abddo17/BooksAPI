const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.status(200).json(books);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error fetching books ${err.message}` });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    if (!book)
      return res
        .status(404)
        .json({ message: `No book matches the ID ${req.params.id}.` });
    res.status(200).json(book);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error retrieving book: ${err.message}` });
  }
};

const addNewBook = async (req, res) => {
  try {
    const result = await Book.create({
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
      available: req.body.available,
    });
    res.status(201).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error adding books ${err.message} ` });
  }
};
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    if (!book)
      return res
        .status(404)
        .json({ message: `No book matches the ID ${req.params.id}.` });
    if (req.body?.title) book.title = req.body.title;
    if (req.body?.author) book.author = req.body.author;
    if (req.body?.publishedYear) book.publishedYear = req.body.publishedYear;
    if (req.body?.genre) book.genre = req.body.genre;
    if (req.body?.hasOwnProperty("available"))
      book.available = req.body.available;
    const result = await book.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: `Error updating book: ${err.message}` });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    if (!book)
      return res
        .status(404)
        .json({ message: `No book matches the ID ${req.params.id}.` });
    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully " });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error deleting book: ${err.message}` });
  }
};

module.exports = { getAllBooks, addNewBook, updateBook, deleteBook, getBook };
