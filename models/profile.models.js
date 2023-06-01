const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  role: String,
  curp: String,
  name: String,
  lastName: String,
  birthDate: Date,
  address: String,
  gender: String,
  phone: String,
  created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Profile", ProfileSchema);
