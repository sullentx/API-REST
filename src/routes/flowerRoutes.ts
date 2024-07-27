import { Router } from 'express';
import { getFlowers, getFlowerById, createFlower, updateFlower, deleteFlower } from '../controllers/flowerController';
import { authMiddleware } from '../shared/middlewares/auth';
import { adminMiddleware } from '../shared/middlewares/roleMiddleware';
import upload from '../shared/middlewares/uploadMiddlewareFlower';
const flowerRoutes :Router = Router();

// routerBouquet.put('/bouquets/:id',upload.single('image_url'),authMiddleware,adminMiddleware ,updateBouquet);

flowerRoutes.get('/flowers', authMiddleware, getFlowers);
flowerRoutes.get('/flower/:name', authMiddleware,getFlowerById)
flowerRoutes.post('/flower',upload.single('image_url'), authMiddleware, adminMiddleware,createFlower);
console.log(createFlower)
flowerRoutes.put('/flower/:id',upload.single('image_url'), authMiddleware,adminMiddleware ,updateFlower);
flowerRoutes.delete('/flower/:id', authMiddleware,adminMiddleware,deleteFlower);

export default flowerRoutes;
