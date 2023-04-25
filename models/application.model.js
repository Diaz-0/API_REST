const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
