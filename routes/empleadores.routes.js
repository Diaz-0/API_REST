const express=require("express");
const EmpleadoresController= require("../controller/empleadores.controller");

const api=express.Router();

api.post("/empleador",EmpleadoresController.createEmpleadores);
api.get("/empleador",EmpleadoresController.getEmpleadores);
api.delete("/empleador/:id",EmpleadoresController.deleteEmpleador);
api.patch("/empleador/:id",EmpleadoresController.updateEmpleadores);
api.get("/empleador/:id",EmpleadoresController.getEmpleador);


module.exports=api;