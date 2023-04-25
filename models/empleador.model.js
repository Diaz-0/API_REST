const mongoose = require("mongoose");
const User = require("./user.models");

const EmployerSchema = mongoose.Schema({
  curp: {
    type: String,
    unique: true,
  },
  name: String,
  lastName: String,
  birthDate: Date,
  gender: String,
  phone: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  created_at: Date,
});

module.exports = mongoose.model("Employer", EmployerSchema);

