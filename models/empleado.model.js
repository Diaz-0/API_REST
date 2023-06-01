const mongoose = require("mongoose");
const User = require("./user.models");

const EmployeeSchema = mongoose.Schema({
  curp: {
    type: String,
    unique: true,
  },
  name: String,
  lastName: String,
  birthDate: Date,
  address: String,
  gender: String,
  phone: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);

