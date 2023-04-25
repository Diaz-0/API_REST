const express = require("express");
const empleadorController = require("../controller/empleador.controller");

const router = express.Router();

router.post("/", empleadorController.createEmpleador);
router.get("/", empleadorController.getEmpleadores);
router.put("/:id", empleadorController.updateEmpleador);
router.delete("/:id", empleadorController.deleteEmpleador);

module.exports = router;
