const Job = require("../models/job.models");
const Application = require("../models/application.model");
const Profile = require("../models/profile.models");

async function getEmployeeDashboard(req, res) {
  try {
    const applications = await Application.find({ employeeId: req.userId });
    const jobs = await Job.find({ _id: { $in: applications.map((app) => app.jobId) } });
    const profiles = await Profile.find({ userId: { $in: jobs.map((job) => job.employerId) } });
    return res.status(200).send({ applications, jobs, profiles });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error en el servidor" });
  }
}

async function getEmployerDashboard(req, res) {
  try {
    const jobs = await Job.find({ employerId: req.userId });
    const applications = await Application.find({ jobId: { $in: jobs.map((job) => job._id) } });
    const profiles = await Profile.find({ userId: { $in: applications.map((app) => app.employeeId) } });
    return res.status(200).send({ jobs, applications, profiles });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error en el servidor" });
  }
}

module.exports = {
  getEmployeeDashboard,
  getEmployerDashboard,
};
