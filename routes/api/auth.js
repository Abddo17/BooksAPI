const express = require("express");
const router = express.Router();
const { loginHandler } = require("../../controllers/authController");
const { authValidator } = require("../../validators/authValidator");
const { registerHandler } = require("../../controllers/registerController");
const { logoutHandler } = require("../../controllers/logoutController");
const {
  refreshTokenHandler,
} = require("../../controllers/refreshTokenController");
const jwtMiddleware = require("../../middleware/verifyJWT");

router.post("/register", authValidator, registerHandler);
router.post("/login", authValidator, loginHandler);
router.post("/logout", logoutHandler);
router.get("/refresh", refreshTokenHandler);
router.get("/me", jwtMiddleware, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;
