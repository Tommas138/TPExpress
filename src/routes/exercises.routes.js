// src/routes/exercises.routes.js
const { Router } = require('express');
const { 
  getAllExercises, 
  getExerciseById, 
  createExercise, 
  updateExercise, 
  deleteExercise 
} = require('../controllers/exercises.controller');

const router = Router();

// Ruta para obtener todos los ejercicios y para crear uno nuevo
router.get('/', getAllExercises);
router.post('/', createExercise);

// Rutas que requieren un ID específico en la URL
router.get('/:id', getExerciseById);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

module.exports = router;