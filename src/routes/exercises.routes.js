// src/routes/exercises.routes.js
const { Router } = require('express');
const exercisesController = require('../controllers/exercises.controller');

const router = Router();

// Ruta para obtener todos los ejercicios y para crear uno nuevo
router.get('/', exercisesController.getAllExercises);
router.post('/', exercisesController.createExercise);

// Rutas que requieren un ID específico en la URL
router.get('/:id', exercisesController.getExerciseById);
router.put('/:id', exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;