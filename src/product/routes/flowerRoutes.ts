import { Router } from 'express';
import { getFlowers, getFlowerById, createFlower, updateFlower, deleteFlower } from '../controllers/flowerController';
import { authMiddleware } from '../../shared/middlewares/auth';

const flowerRoutes :Router = Router();

flowerRoutes.get('/flower', authMiddleware, getFlowers);
flowerRoutes.get('/flower/:id', authMiddleware, getFlowerById)
flowerRoutes.post('/flower', authMiddleware, createFlower);
flowerRoutes.put('/flower/:id', authMiddleware, updateFlower);
flowerRoutes.delete('/flower/:id', authMiddleware, deleteFlower);

export default flowerRoutes;
