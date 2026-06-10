// src/routes/exercises.routes.js
const { Router } = require('express');
const { getAllExercises } = require('../controllers/exercises.controller');

const router = Router();

// Definimos la ruta base para los ejercicios
router.get('/', getAllExercises);

module.exports = router;