const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./constants");

// importaciones de las rutas de la aplicación
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const jobRoutes = require("./routes/job.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// configuración de las rutas
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/profile`, profileRoutes);
app.use(`/api/${API_VERSION}/jobs`, jobRoutes);

module.exports = app;
