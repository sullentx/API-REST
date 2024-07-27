"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bouquetController_1 = require("../controllers/bouquetController");
const roleMiddleware_1 = require("../shared/middlewares/roleMiddleware");
const auth_1 = require("../shared/middlewares/auth");
const uploadMiddleware_1 = __importDefault(require("../shared/middlewares/uploadMiddleware"));
const routerBouquet = (0, express_1.Router)();
// routerBouquet.post('/', upload.single('productImage'), createProduct);
routerBouquet.post('/bouquets', uploadMiddleware_1.default.single('image_url'), auth_1.authMiddleware, roleMiddleware_1.adminMiddleware, bouquetController_1.createBouquet);
routerBouquet.get('/bouquets/:id', bouquetController_1.getBouquetById);
routerBouquet.get('/bouquets', bouquetController_1.getAllBouquets);
routerBouquet.put('/bouquets/:id', uploadMiddleware_1.default.single('image_url'), auth_1.authMiddleware, roleMiddleware_1.adminMiddleware, bouquetController_1.updateBouquet);
routerBouquet.delete('/bouquets/:id', auth_1.authMiddleware, roleMiddleware_1.adminMiddleware, bouquetController_1.deleteBouquet);
routerBouquet.post('/bouquets/custom', auth_1.authMiddleware, roleMiddleware_1.customerMiddleware, bouquetController_1.createCustomBouquet);
exports.default = routerBouquet;
