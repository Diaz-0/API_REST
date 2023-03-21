const express=require("express");
const PersonaController= require("../controller/persona.controller");

const api=express.Router();

api.post("/persona",PersonaController.createPersonas);
api.get("/personas",PersonaController.getPersonas);
api.get("/persona/:id",PersonaController.buscarOnePersona);
api.delete("/persona/:id",PersonaController.deletePersona);
api.patch("/persona/:id",PersonaController.updatePersonas);



module.exports=api;