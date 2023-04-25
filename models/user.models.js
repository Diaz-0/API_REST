const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
