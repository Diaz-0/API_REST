const express = require("express");
const router = express.Router();
const { getAllJobs, getJobById, getJobApplications, createJob, updateJob,
  deleteJob, applyJob, getAllJobsByEmployer, acceptApplication, rejectApplication, getEmployeeNotifications} = require("../controller/job.controller");

router.get("/", getAllJobs);
router.get("/:jobId", getJobById);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
router.post("/:jobId/apply", applyJob);
router.get("/:jobId/applications", getJobApplications);
router.get("/employer/:employerId", getAllJobsByEmployer);
router.put("/application/:applicationId/accept", acceptApplication);
router.put("/application/:applicationId/reject", rejectApplication);
router.get("/employee/:employeeId/notifications", getEmployeeNotifications);

router.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = router;
