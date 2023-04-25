const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  title: String,
  description: String,
  requirements: String,
  salary: Number,
  location: String,
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);