const prisma = require('../config/prisma');

async function findByUser(userId, lang = null, limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  // Always include translations so controller can pick language or fallback
  const includeExercise = {
    exercise: {
      include: {
        translations: true
      }
    }
  };

  const where = userId ? { userId } : {};

  return prisma.favorites.findMany({
    where,
    take: limit,
    skip,
    include: includeExercise
  });
}

async function addFavorite(userId, exerciseId) {
  return prisma.favorites.create({
    data: { userId, exerciseId: Number(exerciseId) }
  });
}

async function findById(id) {
  return prisma.favorites.findUnique({
    where: { id: Number(id) },
    include: {
      exercise: {
        include: { translations: true }
      }
    }
  });
}

async function removeFavorite(userId, exerciseId) {
  return prisma.favorites.deleteMany({
    where: { userId, exerciseId: Number(exerciseId) }
  });
}

async function removeById(id) {
  return prisma.favorites.deleteMany({
    where: { id: Number(id) }
  });
}

module.exports = {
  findByUser,
  // Buscar favorito por su id
  findById,
  removeById,
  addFavorite,
  removeFavorite
};
