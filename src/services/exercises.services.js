const prisma = require('../config/prisma');

// Modificado para soportar paginación real en la tabla base
async function findAll(limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.exercise.findMany({
    take: limit,
    skip: skip,
  });
}

// Busca ejercicios e incluye la traducción para un idioma dado
async function findAllWithLanguage(lang, limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.exercise.findMany({
    take: limit,
    skip: skip,
    include: {
      translations: {
        where: { language: lang }
      }
    }
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

// Busca un ejercicio específico e incluye la traducción para un idioma dado
async function findByIdWithLanguage(id, lang = 'en') {
  return prisma.exercise.findUnique({
    where: { id: Number(id) },
    include: {
      translations: {
        where: { language: lang }
      }
    }
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
  findAllWithLanguage,
  findById,
  findByIdWithLanguage,
  create,
  update,
  remove
};