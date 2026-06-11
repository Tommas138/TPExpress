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

// 2. READ ONE - Obtener un solo ejercicio por su ID
const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await prisma.exercise.findUnique({
      where: { id: parseInt(id) }
    });

    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado.' });
    }

    return res.status(200).json(exercise);
  } catch (error) {
    console.error('Error al obtener el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al buscar el ejercicio.' });
  }
};

// 3. POST - Crear un nuevo ejercicio
const createExercise = async (req, res) => {
  try {
    const { name, muscleGroup, equipment, difficulty, video, breathing, image, technique, targetIntensity } = req.body;
    const details = [];

    // 1. Validación del campo 'name'
    if (!name || name.trim() === '') {
      details.push({
        field: 'name',
        message: 'El nombre es obligatorio'
      });
    }

    // 2. Validación del campo 'muscleGroup'
    if (!muscleGroup || muscleGroup.trim() === '') {
      details.push({
        field: 'muscleGroup',
        message: 'El grupo muscular es obligatorio'
      });
    }

    // 3. Si se acumuló algún error, devolvemos la estructura oficial de la cátedra
    if (details.length > 0) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: details
      });
    }

    // Si pasó el control, impacta en Neon con todos tus valores por defecto
    const newExercise = await prisma.exercise.create({
      data: {
        name,
        muscleGroup,
        equipment: equipment || 'Ninguno',
        difficulty: difficulty || 'Principiante',
        video: video || "placeholder",
        breathing: breathing || "placeholder",
        image: image || "imagen",
        technique: technique || "tecnica",
        targetIntensity: targetIntensity || "targetIntensity"
      }
    });

    return res.status(201).json(newExercise);
  } catch (error) {
    console.error('Error al crear el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al crear el ejercicio. ' + error.message });
  }
};

// 4. UPDATE - Modificar un ejercicio existente
const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, muscleGroup, equipment, difficulty, video, breathing, image, technique, targetIntensity } = req.body;
    const details = [];

    // Verificación 1: ¿El ID provisto es un número válido?
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: 'El ID provisto no es un número válido.' });
    }

    // Verificación 2: ¿El ejercicio existe en la base de datos?
    const existingExercise = await prisma.exercise.findUnique({
      where: { id: parsedId }
    });

    if (!existingExercise) {
      return res.status(404).json({ message: 'El ejercicio que querés editar no existe.' });
    }

    // Verificación 3: Validar los datos del Body (Formato de la Cátedra)
    if (!name || name.trim() === '') {
      details.push({
        field: 'name',
        message: 'El nombre es obligatorio para actualizar'
      });
    }

    if (!muscleGroup || muscleGroup.trim() === '') {
      details.push({
        field: 'muscleGroup',
        message: 'El grupo muscular es obligatorio para actualizar'
      });
    }

    // Si hay errores en el body, frenamos y devolvemos el esquema oficial
    if (details.length > 0) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: details
      });
    }

    // Si pasó todos los controles, ejecutamos la actualización en Neon
    const updatedExercise = await prisma.exercise.update({
      where: { id: parsedId },
      data: {
        name,
        muscleGroup,
        equipment: equipment !== undefined ? equipment : existingExercise.equipment,
        difficulty: difficulty !== undefined ? difficulty : existingExercise.difficulty,
        video: video !== undefined ? video : existingExercise.video,
        breathing: breathing !== undefined ? breathing : existingExercise.breathing,
        image: image !== undefined ? image : existingExercise.image,
        technique: technique !== undefined ? technique : existingExercise.technique,
        targetIntensity: targetIntensity !== undefined ? targetIntensity : existingExercise.targetIntensity
      }
    });

    return res.status(200).json(updatedExercise);
  } catch (error) {
    console.error('Error al actualizar el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al actualizar el ejercicio. ' + error.message });
  }
};

// 5. DELETE - Eliminar un ejercicio
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const existingExercise = await prisma.exercise.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingExercise) {
      return res.status(404).json({ message: 'El ejercicio que querés borrar no existe.' });
    }

    await prisma.exercise.delete({
      where: { id: parseInt(id) }
    });

    return res.status(200).json({ message: 'Ejercicio eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al eliminar el ejercicio.' });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};