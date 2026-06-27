// Rutas para manejar favoritos (GET, POST, DELETE)

const { Router } = require('express');
const favoritesController = require('../controllers/favorites.controller');
const {protectRoute} = require("../middlewares/auth.middleware");

const router = Router();

router.use(protectRoute);

router.get('/', favoritesController.getFavorites);

router.get('/:id', favoritesController.getFavoriteById);

router.delete('/:id', favoritesController.removeFavorite);

router.post('/', favoritesController.addFavorite);

router.delete('/', favoritesController.removeFavorite);

module.exports = router;
