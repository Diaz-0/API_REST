const express = require("express");
const empleadoController = require("../controller/empleado.controller");

const router = express.Router();

router.post("/", empleadoController.createEmpleado);
router.get("/", empleadoController.getEmpleados);
router.put("/:id", empleadoController.updateEmpleado);
router.delete("/:id", empleadoController.deleteEmpleado);

module.exports = router;

