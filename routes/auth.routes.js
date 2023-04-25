const express = require("express");
const { register, login } = require("../controller/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = router;
