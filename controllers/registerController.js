const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const registerHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check the duplicate user in database
    const duplicateUser = await User.findOne({ username: username }).exec();
    if (duplicateUser)
      // 409 => confict
      return res.status(409).json({ message: "username is already exists." });
    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // store the user
    const newUser = new User({
      username: username,
      password: hashedPwd,
    });
    // after saving the new user
    const payload = {
      username: newUser.username,
      id: newUser._id,
      roles: newUser.roles,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // send refresh token cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // respond with access token
    res.status(201).json({
      message: `User ${username} registered successfully.`,
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: `internal server error : ${err}`,
    });
  }
};

module.exports = { registerHandler };
