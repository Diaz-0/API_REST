const Job = require("../models/job.models");
const Application = require("../models/application.model");
const Profile = require("../models/profile.models");

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find({ isAccepted: false }).populate("employer");
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
    const job = await Job.findById(req.params.jobId).populate({
      path: "applications",
      populate: {
        path: "employeeProfile",
        select: "-_id curp name lastName birthDate address gender phone ",
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    res.status(200).json(job.applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function getAllJobsByEmployer(req, res) {
  try {
    const jobs = await Job.find({ employer: req.params.employerId }).populate(
      "employer"
    );
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function getEmployeeNotifications(req, res) {
  try {
    const notifications = await Application.find({
      employeeProfile: req.params.employeeId,
    })
      .populate("job", "title description salary location requirements")
      .select("notification");

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}


async function createJob(req, res) {
  try{
    const { title, description, salary, location, requirements, employer } = req.body;
    const job = await Job.create({
    title,
    description,
    salary,
    location,
    requirements,
    employer // Agregar el ID del usuario a la creación de empleo
    });
    res.status(201).json({ job });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el trabajo" });
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
    const { employeeProfileId } = req.body;

    if (!employeeProfileId) {
      return res
        .status(400)
        .json({ message: "Missing required fields" });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    const profile = await Profile.findById(employeeProfileId);

    if (!profile) {
      return res.status(404).json({ message: "Perfil de empleado no encontrado" });
    }

    const newApplication = new Application({
      employeeProfile: profile._id,
      job: job._id,
    });

    await newApplication.save();

    job.applications.push(newApplication);

    await job.save();

    return res
      .status(201)
      .json({ message: "Solicitud enviada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function acceptApplication(req, res) {
  try {
    const application = await Application.findById(req.params.applicationId);

    if (!application) {
      return res
        .status(404)
        .json({ message: "Solicitud de trabajo no encontrada" });
    }

    application.status = "Aceptado";
    application.notification = "Aceptado";
    await application.save();

    const job = await Job.findById(application.job);

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    job.isAccepted = true;
    await job.save();

    return res
      .status(200)
      .json({ message: "Solicitud aceptada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function rejectApplication(req, res) {
  try {
    const application = await Application.findById(req.params.applicationId);

    if (!application) {
      return res
        .status(404)
        .json({ message: "Solicitud de trabajo no encontrada" });
    }

    application.status = "Rechazado";
    application.notification = "Rechazado";
    await application.save();

    return res
      .status(200)
      .json({ message: "Solicitud rechazada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  getJobApplications,
  getAllJobsByEmployer,
  getEmployeeNotifications,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  acceptApplication,
  rejectApplication
};