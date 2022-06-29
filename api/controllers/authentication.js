const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    // search if the user exists
    // if yes check if the password matches
    // if no return wrong email or password
    // if yes create access and refresh token
    // return success response

    const createUser = await User.createAdminUser(
      "adhamjamal@mailinator.com",
      "12345678"
    );

    return res.status(201).json({
      createUser,
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
    // code
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.toString(),
    });
  }
};
