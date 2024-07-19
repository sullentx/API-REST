import { Router } from 'express';
import { createBouquet, getBouquetById, getAllBouquets, updateBouquet, deleteBouquet, } from '../controllers/BouquetController';
import { adminMiddleware } from '../shared/middlewares/roleMiddleware';
import { authMiddleware } from '../shared/middlewares/auth';

const routerBouquet = Router();

routerBouquet.post('/bouquets',authMiddleware ,adminMiddleware,createBouquet);
routerBouquet.get('/bouquets/:id', getBouquetById);
routerBouquet.get('/bouquets', getAllBouquets);
routerBouquet.put('/bouquets/:id',authMiddleware,adminMiddleware ,updateBouquet);
routerBouquet.delete('/bouquets/:id', authMiddleware,adminMiddleware,deleteBouquet);

export default routerBouquet;
