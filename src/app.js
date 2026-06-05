const express = require("express");
const cors = require("cors");
require("dotenv").config(); //Para cargar las variables .env}

const app = express();

app.use(express.json());

//Config cors
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ["PUT", "GET", "DELETE", "POST"],
    allowedHeaders: ["Content-Type" , "Authorization"]
}));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime() // Muestra cuántos segundos lleva activo el servidor
  });
});
// Exportamos la app configurada para que index.js la pueda levantar
module.exports = app;