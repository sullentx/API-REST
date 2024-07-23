import { Router } from 'express';
import { getFlowers, getFlowerById, createFlower, updateFlower, deleteFlower } from '../controllers/flowerController';
import { authMiddleware } from '../shared/middlewares/auth';
import { adminMiddleware } from '../shared/middlewares/roleMiddleware';
const flowerRoutes :Router = Router();

flowerRoutes.get('/flower', authMiddleware, getFlowers);
flowerRoutes.get('/flower/:name', authMiddleware,getFlowerById)
flowerRoutes.post('/flower', authMiddleware, adminMiddleware,createFlower);
flowerRoutes.put('/flower/:name', authMiddleware,adminMiddleware ,updateFlower);
flowerRoutes.delete('/flower/:name', authMiddleware,adminMiddleware,deleteFlower);

export default flowerRoutes;
