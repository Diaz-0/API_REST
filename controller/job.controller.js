const Job = require("../models/job.models");
const Application = require("../models/application.model");

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find().populate("employer");
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.jobId).populate("employer");
    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
async function getJobApplications(req, res) {
  try {
    const job = await Job.findById(req.params.jobId).populate("applications");
    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }
    res.status(200).json(job.applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function createJob(req, res) {
    try {
      const job = await Job.create({
        ...req.body,
        employer: req.user ? req.user.id : null,
      });
      res.status(201).json(job);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
}

async function updateJob(req, res) {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { ...req.body },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function deleteJob(req, res) {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function applyJob(req, res) {
  try {
    const { name, email, phone, resume } = req.body;

    if (!name || !email || !phone || !resume) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    const newApplication = new Application({
      name,
      email,
      phone,
      resume,
      job: job._id,
    });

    await newApplication.save();

    job.applications.push(newApplication);

    await job.save();

    return res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  getJobApplications,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
};