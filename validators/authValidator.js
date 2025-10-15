const { body, validationResult } = require("express-validator");
const authValidator = [
  body("username").trim().notEmpty().withMessage("Username is required."),
  body("password").trim().notEmpty().withMessage("Password is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { authValidator };
