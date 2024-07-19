import { getOrders, updateOrderStatus } from '../controllers/ordersController';
import { Router } from 'express';
import { authMiddleware } from '../shared/middlewares/auth';
import {  deliveryManMiddleware } from '../shared/middlewares/roleMiddleware';
const personRoutes: Router = Router();

personRoutes.get('/orders', authMiddleware, deliveryManMiddleware, getOrders);
personRoutes.put('/orders/:id', authMiddleware, deliveryManMiddleware, updateOrderStatus); 