const express = require("express");
const cors = require("cors");
require("dotenv").config(); //Para cargar las variables .env}
const exercisesRouter = require("./routes/exercises.routes");
const favoritesRouter = require("./routes/favorites.routes");
const authRoutes = require("./routes/auth.routes");


const app = express();

app.use(express.json());

//Configuramos cors para permitir solo el frontend 
const frontendUrls = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(u => u.trim())
  .filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (frontendUrls.includes(origin)) return callback(null, true);
        return callback(new Error('CORS policy: origin not allowed'));
    },
    methods: ["PUT", "GET", "DELETE", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/exercises", exercisesRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "¡API de Ejercicios funcionando impecable en Vercel!",
        docs: "/api/exercises"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime() //Esta linea nos muestra cuántos segundos lleva activo el servidor
  });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint no encontrado.' });
});

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
// Exportamos la app configurada para que index.js la pueda levantar
module.exports = app;