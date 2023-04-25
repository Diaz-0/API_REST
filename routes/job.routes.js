const express = require("express");
const router = express.Router();
const { getAllJobs, getJobById, getJobApplications, createJob, updateJob, deleteJob, applyJob } = require("../controller/job.controller");

router.get("/", getAllJobs);
router.get("/:jobId", getJobById);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
router.post("/:jobId/apply", applyJob);
router.get("/:jobId/applications", getJobApplications);


router.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = router;
