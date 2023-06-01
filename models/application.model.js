const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  employeeProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  notification: {
    type: String,
    enum: ["Aceptado", "Rechazado", "Pendiente"],
    default: "Pendiente",
  },
});


const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
