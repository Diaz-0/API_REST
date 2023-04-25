const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getProfile, updateProfile } = require("../controller/profile.controller");

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

router.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = router;
