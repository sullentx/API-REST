import { createRequest, getOrders, updateOrderStatus } from '../controllers/requestController';
import { Router } from 'express';
import { authMiddleware } from '../shared/middlewares/auth';
import {  customerMiddleware, deliveryManMiddleware } from '../shared/middlewares/roleMiddleware';
const resquestRoutes: Router = Router();

resquestRoutes.get('/request', authMiddleware, deliveryManMiddleware, getOrders);
resquestRoutes.put('/request/:id', authMiddleware, deliveryManMiddleware, updateOrderStatus); 
resquestRoutes.post('/request',authMiddleware,customerMiddleware,createRequest)

export default resquestRoutes;