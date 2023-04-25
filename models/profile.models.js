const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  name: String,
  lastName: String,
  age: Number,
  address: String,
  phoneNumber: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
