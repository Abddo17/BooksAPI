const User = require("../models/user");

const logoutHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (foundUser) {
      foundUser.refreshToken = "";
      await foundUser.save();
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { logoutHandler };
