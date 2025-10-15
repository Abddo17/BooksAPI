const jwt = require("jsonwebtoken");
const User = require("../models/user");

const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const foundUser = await User.findById(decoded.id).exec();
    if (!foundUser || foundUser.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const payload = {
      username: foundUser.username,
      id: foundUser._id,
      roles: foundUser.roles,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = { refreshTokenHandler };
