// src/controllers/exercises.controller.js
const prisma = require('../config/prisma');

// GET /api/exercises -> Obtener todos los ejercicios para armar las rutinas
const getAllExercises = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany();
    return res.status(200).json(exercises);
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error);
    return res.status(500).json({ message: 'Error interno del servidor al traer los ejercicios.' });
  }
};

module.exports = {
  getAllExercises,
};