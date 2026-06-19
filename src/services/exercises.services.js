const prisma = require('../config/prisma');

// Modificamos para soportar paginación real en la tabla base
async function findAll(limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.exercise.findMany({
    take: limit,
    skip: skip,
    include: {
      translations: true
    }
  });
}

// Buscamos ejercicios e incluimos la traducción para un idioma dado
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

// NUEVO SERVICIO: Buscamos en exerciseTranslation según el idioma y pagina
async function findByLanguage(lang, limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.exerciseTranslation.findMany({
    where: {
      language: lang 
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

// Buscamos un ejercicio específico e incluimos la traducción para un idioma dado
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
  const { difficulty, video, image, targetIntensity, translations } = data;

  const createData = {
    difficulty: difficulty || 'Principiante',
    video: video || 'placeholder',
    image: image || 'imagen',
    targetIntensity: targetIntensity || 'targetIntensity'
  };

  if (Array.isArray(translations) && translations.length > 0) {
    createData.translations = {
      create: translations.map((t) => ({
        language: t.language,
        name: t.name,
        muscleGroup: t.muscleGroup || '',
        equipment: t.equipment || '',
        breathing: t.breathing || '',
        technique: t.technique || ''
      }))
    };
  }

  try {
    return await prisma.exercise.create({
      data: createData,
      include: { translations: true }
    });
  } catch (err) {
    console.error('Prisma create error (exercises.services.create):', err.message);
    if (err.code) console.error('Prisma error code:', err.code);
    if (err.meta) console.error('Prisma error meta:', err.meta);
    throw err;
  }
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
  const exerciseId = Number(id);

  // Eliminamos favoritos relacionados primero
  await prisma.favorites.deleteMany({
    where: { exerciseId }
  });

  // Eliminamos traducciones relacionadas
  await prisma.exerciseTranslation.deleteMany({
    where: { exerciseId }
  });

  // Finalmente eliminamos el ejercicio
  return prisma.exercise.delete({
    where: { id: exerciseId }
  });
}

module.exports = {
  findAll,
  findByLanguage, 
  findAllWithLanguage,
  findById,
  findByIdWithLanguage,
  create,
  update,
  remove
};