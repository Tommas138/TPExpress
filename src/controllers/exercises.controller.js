const exercisesService = require('../services/exercises.services.js');

// GET /api/exercises
async function getAllExercises(req, res) {
  try {
    const exercises = await exercisesService.findAll();
    return res.status(200).json(exercises);
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error);
    return res.status(500).json({ message: 'Error interno del servidor al traer los ejercicios.' });
  }
}

// GET /api/exercises/:id
async function getExerciseById(req, res) {
  try {
    const exercise = await exercisesService.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado.' });
    }

    return res.status(200).json(exercise);
  } catch (error) {
    console.error('Error al obtener el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al buscar el ejercicio.' });
  }
}

// POST /api/exercises
async function createExercise(req, res) {
  try {
    const { name, muscleGroup } = req.body;
    const details = [];

    // Validación del campo 'name'
    if (!name || name.trim() === '') {
      details.push({ field: 'name', message: 'El nombre es obligatorio' });
    }

    // Validación del campo 'muscleGroup'
    if (!muscleGroup || muscleGroup.trim() === '') {
      details.push({ field: 'muscleGroup', message: 'El grupo muscular es obligatorio' });
    }

    if (details.length > 0) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: details
      });
    }

    const newExercise = await exercisesService.create(req.body);
    return res.status(201).json(newExercise);
  } catch (error) {
    console.error('Error al crear el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al crear el ejercicio. ' + error.message });
  }
}

// PUT /api/exercises/:id
async function updateExercise(req, res) {
  try {
    const { id } = req.params;
    const { name, muscleGroup } = req.body;
    const details = [];

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: 'El ID provisto no es un número válido.' });
    }

    // Verificación: ¿El ejercicio existe en la base de datos?
    const existingExercise = await exercisesService.findById(parsedId);
    if (!existingExercise) {
      return res.status(404).json({ message: 'El ejercicio que querés editar no existe.' });
    }

    // Validar los datos requeridos obligatorios para actualización
    if (!name || name.trim() === '') {
      details.push({ field: 'name', message: 'El nombre es obligatorio para actualizar' });
    }

    if (!muscleGroup || muscleGroup.trim() === '') {
      details.push({ field: 'muscleGroup', message: 'El grupo muscular es obligatorio para actualizar' });
    }

    if (details.length > 0) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: details
      });
    }

    // Fusionamos los datos entrantes manteniendo los existentes si son undefined
    const updatedData = {
      name,
      muscleGroup,
      equipment: req.body.equipment !== undefined ? req.body.equipment : existingExercise.equipment,
      difficulty: req.body.difficulty !== undefined ? req.body.difficulty : existingExercise.difficulty,
      video: req.body.video !== undefined ? req.body.video : existingExercise.video,
      breathing: req.body.breathing !== undefined ? req.body.breathing : existingExercise.breathing,
      image: req.body.image !== undefined ? req.body.image : existingExercise.image,
      technique: req.body.technique !== undefined ? req.body.technique : existingExercise.technique,
      targetIntensity: req.body.targetIntensity !== undefined ? req.body.targetIntensity : existingExercise.targetIntensity
    };

    const updatedExercise = await exercisesService.update(parsedId, updatedData);
    return res.status(200).json(updatedExercise);
  } catch (error) {
    console.error('Error al actualizar el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al actualizar el ejercicio. ' + error.message });
  }
}

// DELETE /api/exercises/:id
async function deleteExercise(req, res) {
  try {
    const { id } = req.params;

    const existingExercise = await exercisesService.findById(id);
    if (!existingExercise) {
      return res.status(404).json({ message: 'El ejercicio que querés borrar no existe.' });
    }

    await exercisesService.remove(id);
    return res.status(200).json({ message: 'Ejercicio eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el ejercicio:', error);
    return res.status(500).json({ message: 'Error interno al eliminar el ejercicio.' });
  }
}

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};