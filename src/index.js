// src/index.js
const app = require('./app');

// Tomamos el puerto de las variables de entorno o usamos el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Ponemos al servidor a escuchar peticiones HTTP
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo de forma exitosa en el puerto ${PORT}`);
  console.log(`🔗 Ruta de salud disponible en: http://localhost:${PORT}/api/health`);
});