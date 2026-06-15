const prisma = require('../config/prisma');

// Modificado para soportar paginación real en la tabla base
async function findAll(limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.exercise.findMany({
    take: limit,
    skip: skip,
  });
}

// NUEVO SERVICIO: Busca en exerciseTranslation según el idioma y pagina
async function findByLanguage(lang, limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.exerciseTranslation.findMany({
    where: {
      language: lang // Filtra por "en" o "es" según la URL
    },
    take: limit,
    skip: skip
  });
}

async function findById(id) {
  return prisma.exercise.findUnique({
    where: { id: Number(id) }
  });
}

async function create(data) {
  const { name, muscleGroup, equipment, difficulty, video, breathing, image, technique, targetIntensity } = data;
  
  return prisma.exercise.create({
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
}

async function update(id, data) {
  const exerciseId = Number(id);
  const { name, muscleGroup, equipment, difficulty, video, breathing, image, technique, targetIntensity } = data;

  return prisma.exercise.update({
    where: { id: exerciseId },
    data: {
      name,
      muscleGroup,
      equipment,
      difficulty,
      video,
      breathing,
      image,
      technique,
      targetIntensity
    }
  });
}

async function remove(id) {
  return prisma.exercise.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  findAll,
  findByLanguage, // Exportamos el nuevo servicio
  findById,
  create,
  update,
  remove
};