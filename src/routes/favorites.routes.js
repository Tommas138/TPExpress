const { Router } = require('express');
const favoritesController = require('../controllers/favorites.controller');

const router = Router();

// Listar favoritos del usuario: ?userId=... o se toma de req.user
router.get('/', favoritesController.getFavorites);

// Obtener favorito por su id
router.get('/:id', favoritesController.getFavoriteById);

// Eliminar favorito por su id
router.delete('/:id', favoritesController.removeFavorite);

// Agregar favorito (body: { exerciseId, userId? })
router.post('/', favoritesController.addFavorite);

// Eliminar favorito por exerciseId (query: ?exerciseId=...)
router.delete('/', favoritesController.removeFavorite);

module.exports = router;
