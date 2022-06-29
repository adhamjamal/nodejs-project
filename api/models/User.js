const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

User.createAdminUser = async (email, password) => {
  const user = new User({
    email,
    password,
  });

  return await user.save();
};

module.exports = User;
