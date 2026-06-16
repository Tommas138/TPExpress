const favoritesService = require('../services/favorites.services');
const prisma = require('../config/prisma');

function resolveUserId(req) {
  if (!req) return null;
  if (req.user && req.user.id) return req.user.id;
  if (req.query && req.query.userId) return req.query.userId;
  if (req.body && req.body.userId) return req.body.userId;
  return null;
}

async function getFavorites(req, res) {
  try {
    const userId = resolveUserId(req);
    const limit = parseInt((req.query && req.query.limit) || 10) || 10;
    const page = parseInt((req.query && req.query.page) || 1) || 1;
    const lang = req.query && req.query.lang ? req.query.lang : null;
    console.log('getFavorites called', { userId, lang, limit, page });

    if (lang) {
      const allowed = ['en', 'es'];
      if (!allowed.includes(lang)) {
        return res.status(400).json({ message: 'Idioma no soportado. Usa "en" o "es".' });
      }
    }

    const list = await favoritesService.findByUser(userId, lang, limit, page);

    // Map to match exercises response shape (base fields + translation)
    const mapped = list.map((f) => {
      const ex = f.exercise || null;
      let t = null;
      if (ex && ex.translations && ex.translations.length > 0) {
        if (lang) {
          t = ex.translations.find((x) => x.language === lang) || null;
        }
        if (!t) t = ex.translations[0];
      }
      if (!ex) {
        return {
          id: f.id,
          userId: f.userId,
          exerciseId: f.exerciseId,
          exercise: null
        };
      }

      // Build translations object keyed by language (e.g. { en: {...}, es: {...} })
      const translationsByLang = {};
      if (ex && ex.translations) {
        ex.translations.forEach((tr) => {
          translationsByLang[tr.language] = {
            id: tr.id,
            language: tr.language,
            name: tr.name,
            muscleGroup: tr.muscleGroup,
            equipment: tr.equipment,
            breathing: tr.breathing,
            technique: tr.technique,
          };
        });
      }

      return {
        id: f.id,
        userId: f.userId,
        exerciseId: f.exerciseId,
        exercise: {
          id: ex.id,
          difficulty: ex.difficulty,
          video: ex.video,
          image: ex.image,
          targetIntensity: ex.targetIntensity,
          translations: translationsByLang,
        }
      };
    });

    return res.status(200).json(mapped);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    console.error(error && error.stack ? error.stack : 'no stack');
    return res.status(500).json({ message: 'Error interno al obtener favoritos.' });
  }
}

async function addFavorite(req, res) {
  try {
    const userId = resolveUserId(req);
    const { exerciseId } = req.body;

    if (!exerciseId) {
      return res.status(400).json({ message: 'exerciseId es obligatorio.' });
    }

    // verificar que el ejercicio exista
    const exercise = await prisma.exercise.findUnique({ where: { id: Number(exerciseId) } });
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado.' });
    }

    try {
      const userToUse = userId || req.body.userId || 'anonymous';
      const created = await favoritesService.addFavorite(userToUse, exerciseId);
      return res.status(201).json(created);
    } catch (e) {
      // posible violación de unique -> ya existe
      console.error(e);
      return res.status(409).json({ message: 'Favorito ya existe.' });
    }
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    return res.status(500).json({ message: 'Error interno al agregar favorito.' });
  }
}

async function getFavoriteById(req, res) {
  try {
    const id = req.params.id;
    const fav = await favoritesService.findById(id);
    if (!fav) return res.status(404).json({ message: 'Favorito no encontrado.' });

    const ex = fav.exercise || null;
    if (!ex) {
      return res.status(200).json({ id: fav.id, userId: fav.userId, exerciseId: fav.exerciseId, exercise: null });
    }

    const translationsByLang = {};
    if (ex.translations) {
      ex.translations.forEach((tr) => {
        translationsByLang[tr.language] = {
          id: tr.id,
          language: tr.language,
          name: tr.name,
          muscleGroup: tr.muscleGroup,
          equipment: tr.equipment,
          breathing: tr.breathing,
          technique: tr.technique,
        };
      });
    }

    return res.status(200).json({
      id: fav.id,
      userId: fav.userId,
      exerciseId: fav.exerciseId,
      exercise: {
        id: ex.id,
        difficulty: ex.difficulty,
        video: ex.video,
        image: ex.image,
        targetIntensity: ex.targetIntensity,
        translations: translationsByLang,
      }
    });
  } catch (error) {
    console.error('Error al obtener favorito por id:', error);
    return res.status(500).json({ message: 'Error interno al obtener favorito.' });
  }
}

async function removeFavorite(req, res) {
  try {
    const userId = resolveUserId(req);
    // If an id param is provided, delete by favorite id
    if (req.params && req.params.id) {
      const favId = req.params.id;
      const result = await favoritesService.removeById(favId);
      if (result.count === 0) {
        return res.status(404).json({ message: 'Favorito no encontrado.' });
      }
      return res.status(200).json({ message: 'Favorito eliminado correctamente.' });
    }

    const exerciseId = req.query.exerciseId ?? req.body.exerciseId ?? req.params.exerciseId;

    if (!exerciseId) {
      return res.status(400).json({ message: 'exerciseId es obligatorio para eliminar.' });
    }

    const result = await favoritesService.removeFavorite(userId, exerciseId);

    if (result.count === 0) {
      return res.status(404).json({ message: 'Favorito no encontrado.' });
    }

    return res.status(200).json({ message: 'Favorito eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    return res.status(500).json({ message: 'Error interno al eliminar favorito.' });
  }
}

module.exports = {
  getFavorites,
  getFavoriteById,
  addFavorite,
  removeFavorite
};
