// src/routes/exercises.routes.js
const { Router } = require('express');
const exercisesController = require('../controllers/exercises.controller');

const router = Router();

// Ruta base (Español o por defecto) y creación
router.get('/', exercisesController.getAllExercises);
router.post('/', exercisesController.createExercise);

// NUEVA RUTA: Filtrar traducciones por idioma (/lang/en, /lang/es, etc.)
router.get('/lang/:lang', exercisesController.getExercisesByLanguage);

// Rutas que requieren un ID específico en la URL (van abajo para no interferir)
router.get('/:id', exercisesController.getExerciseById);
router.put('/:id', exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;