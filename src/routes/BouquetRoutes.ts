import { Router } from 'express';
import { createBouquet, getBouquetById, getAllBouquets, updateBouquet, deleteBouquet, createCustomBouquet, } from '../controllers/bouquetController';
import { adminMiddleware, customerMiddleware } from '../shared/middlewares/roleMiddleware';
import { authMiddleware } from '../shared/middlewares/auth';
import upload from '../shared/middlewares/uploadMiddleware';

const routerBouquet = Router();
// routerBouquet.post('/', upload.single('productImage'), createProduct);
routerBouquet.post('/bouquets',upload.single('image_url'),authMiddleware ,adminMiddleware,createBouquet);
routerBouquet.get('/bouquets/:id', getBouquetById);
routerBouquet.get('/bouquets', getAllBouquets);
routerBouquet.put('/bouquets/:id',upload.single('image_url'),authMiddleware,adminMiddleware ,updateBouquet);
routerBouquet.delete('/bouquets/:id', authMiddleware,adminMiddleware,deleteBouquet);
routerBouquet.post('/bouquets/custom', authMiddleware, customerMiddleware ,createCustomBouquet);
export default routerBouquet;
