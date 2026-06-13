const prisma = require('../config/prisma');

async function findAll() {
  return prisma.exercise.findMany();
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
  const exerciseId = Number(id);

  return prisma.exercise.delete({
    where: { id: exerciseId }
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};