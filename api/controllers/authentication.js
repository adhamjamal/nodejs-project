const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    // fetch user
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // user email not found
      return res.status(403).json({
        message: "Wrong email or password",
      });
    }

    // compare password
    if (!bcryptjs.compareSync(req.body.password, user.password)) {
      // password does not match
      return res.status(403).json({
        message: "Wrong email or password",
      });
    }

    // generate access and refresh token
    const accessToken = jwt.sign({ id: user._id }, "access_token_key", {
      expiresIn: 50000,
    });
    const refreshToken = jwt.sign({ id: user._id }, "refresh_token_key", {
      expiresIn: 500000,
    });

    // set the refresh token in httpOnly secure cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 500000,
      httpOnly: true,
      sameSite: false,
      secure: false,
    });

    return res.status(200).json({
      message: "Success login",
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
        tokens: {
          accessToken,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.toString(),
    });
  }
};

exports.register = async (req, res) => {
  try {
    // password hash
    const passwordHash = bcryptjs.hashSync(req.body.password, 10);

    // add user to the database
    const userData = new User({
      email: req.body.email,
      password: passwordHash,
    });
    const user = await userData.save();

    return res.status(201).json({
      message: "User has been added successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.toString(),
    });
  }
};
