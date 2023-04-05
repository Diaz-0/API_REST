const express=require("express");
const EmpleadosController= require("../controller/empleado.controller");

const api=express.Router();

api.post("/empleado",EmpleadosController.createEmpleados);
api.get("/empleado",EmpleadosController.getEmpleados);
api.delete("/empleado/:id",EmpleadosController.deleteEmpleado);
api.patch("/empleado/:id",EmpleadosController.updateEmpleados);
api.get("/empleado/:id",EmpleadosController.getEmpleados);



module.exports=api;