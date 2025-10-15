const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
  getBook,
} = require("../../controllers/booksController");
const {
  createBookValidator,
  getBookValidator,
  updateBookValidator,
  deleteBookValidator,
} = require("../../validators/bookValidator");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
// Get all
router.get("/", getAllBooks);
// Get a specific book
router.get("/:id", getBookValidator, getBook);
// Create
router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  createBookValidator,
  addNewBook
);
// Update
router.patch(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  updateBookValidator,
  updateBook
);
// Delete
router.delete(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  deleteBookValidator,
  deleteBook
);

module.exports = router;
