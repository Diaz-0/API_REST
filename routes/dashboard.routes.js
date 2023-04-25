const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getEmployeeDashboard, getEmployerDashboard } = require("../controller/dashboard.controller");

const router = express.Router();

router.get("/employee", authMiddleware, getEmployeeDashboard);
router.get("/employer", authMiddleware, getEmployerDashboard);

router.use((req, res) => {
res.status(404).send("Not Found");
});

module.exports = router;