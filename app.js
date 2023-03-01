const express = require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const {
    API_VERSION
}=require("./constants");


const app=express();

//importaciones de las rutas de la aplicacion
const alumnoRoutes=require("./routes/alumnos.routes");
const personaRoutes=require("./routes/personas.route")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


//Configuración de las rutas
app.use(`/api/${API_VERSION}`, alumnoRoutes);
app.use(`/api/${API_VERSION}`, personaRoutes);

module.exports=app;



