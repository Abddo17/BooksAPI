const { body, validationResult, param } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};
// Create
const createBookValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters."),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required.")
    .isLength({ max: 255 })
    .withMessage("Author must be less than 255 characters."),

  body("publishedYear")
    .notEmpty()
    .withMessage("Published year is required.")
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year."),

  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required.")
    .isLength({ max: 100 })
    .withMessage("Genre must be less than 100 characters."),

  body("available")
    .notEmpty()
    .withMessage("Availability is required.")
    .isBoolean()
    .withMessage("Available must be a boolean."),

  handleValidation,
];
// Get by ID
const getBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID."),
  handleValidation,
];
// Update
const updateBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID."),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters."),

  body("author")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Author must be less than 255 characters."),

  body("publishedYear")
    .optional()
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year."),

  body("genre")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Genre must be less than 100 characters."),

  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available must be a boolean."),

  handleValidation,
];
// Delete
const deleteBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID."),
  handleValidation,
];

module.exports = {
  createBookValidator,
  getBookValidator,
  updateBookValidator,
  deleteBookValidator,
};
