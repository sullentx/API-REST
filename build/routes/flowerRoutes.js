"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flowerController_1 = require("../controllers/flowerController");
const auth_1 = require("../shared/middlewares/auth");
const roleMiddleware_1 = require("../shared/middlewares/roleMiddleware");
const uploadMiddlewareFlower_1 = __importDefault(require("../shared/middlewares/uploadMiddlewareFlower"));
const flowerRoutes = (0, express_1.Router)();
// routerBouquet.put('/bouquets/:id',upload.single('image_url'),authMiddleware,adminMiddleware ,updateBouquet);
flowerRoutes.get('/flowers', auth_1.authMiddleware, flowerController_1.getFlowers);
flowerRoutes.get('/flower/:name', auth_1.authMiddleware, flowerController_1.getFlowerById);
flowerRoutes.post('/flower', uploadMiddlewareFlower_1.default.single('image_url'), auth_1.authMiddleware, roleMiddleware_1.adminMiddleware, flowerController_1.createFlower);
console.log(flowerController_1.createFlower);
flowerRoutes.put('/flower/:id', uploadMiddlewareFlower_1.default.single('image_url'), auth_1.authMiddleware, roleMiddleware_1.adminMiddleware, flowerController_1.updateFlower);
flowerRoutes.delete('/flower/:id', auth_1.authMiddleware, roleMiddleware_1.adminMiddleware, flowerController_1.deleteFlower);
exports.default = flowerRoutes;
