"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ordersController_1 = require("../controllers/ordersController");
const express_1 = require("express");
const auth_1 = require("../shared/middlewares/auth");
const roleMiddleware_1 = require("../shared/middlewares/roleMiddleware");
const personRoutes = (0, express_1.Router)();
personRoutes.get('/orders', auth_1.authMiddleware, roleMiddleware_1.deliveryManMiddleware, ordersController_1.getOrders);
personRoutes.put('/orders/:id', auth_1.authMiddleware, roleMiddleware_1.deliveryManMiddleware, ordersController_1.updateOrderStatus);
