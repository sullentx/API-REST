"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoriteController_1 = require("../controllers/favoriteController");
const roleMiddleware_1 = require("../shared/middlewares/roleMiddleware");
const auth_1 = require("../shared/middlewares/auth");
const personRoutes = (0, express_1.Router)();
personRoutes.get('/favorites', auth_1.authMiddleware, roleMiddleware_1.customerMiddleware, favoriteController_1.getFavorites);
personRoutes.delete('/favorites/:id', auth_1.authMiddleware, roleMiddleware_1.customerMiddleware, favoriteController_1.deleteFavorite);
personRoutes.post('/favorites', auth_1.authMiddleware, roleMiddleware_1.customerMiddleware, favoriteController_1.addFavorite);
exports.default = personRoutes;