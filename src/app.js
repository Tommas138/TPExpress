const express = require("express");
const cors = require("cors");
require("dotenv").config(); //Para cargar las variables .env}
const exercisesRouter = require("./routes/exercises.routes");
const favoritesRouter = require("./routes/favorites.routes");


const app = express();

app.use(express.json());

//Config cors
// Allow multiple frontends via comma-separated FRONTEND_URL env var
const frontendUrls = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(u => u.trim())
  .filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow non-browser requests (like curl, server-to-server)
        if (!origin) return callback(null, true);
        if (frontendUrls.includes(origin)) return callback(null, true);
        return callback(new Error('CORS policy: origin not allowed'));
    },
    methods: ["PUT", "GET", "DELETE", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/exercises", exercisesRouter);
app.use("/api/favorites", favoritesRouter);

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
        uptime: process.uptime() // Muestra cuántos segundos lleva activo el servidor
  });
});
// Not-found handler: devolver JSON cuando la ruta no existe
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint no encontrado.' });
});

// Manejo centralizado de errores (debe ir después de todas las rutas)
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
// Exportamos la app configurada para que index.js la pueda levantar
module.exports = app;