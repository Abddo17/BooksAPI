const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const loginHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({
      username: username,
    }).exec();

    if (!foundUser) return res.status(401).json({ error: "Unauthorized" });
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ error: "Unauthorized" });
    // jwt payload
    const payload = {
      username: foundUser.username,
      id: foundUser._id,
      roles: foundUser.roles,
    };
    // generate access Token
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
    // generate refresh Token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    // send tokens to client
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({ accessToken });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { loginHandler };
