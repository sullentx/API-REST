import { Router } from 'express';
import { getFavorites,deleteFavorite,addFavorite } from '../controllers/favoriteController';
import { customerMiddleware } from '../shared/middlewares/roleMiddleware';
import { authMiddleware } from '../shared/middlewares/auth';

const personRoutes: Router = Router();

personRoutes.get('/favorites', authMiddleware, customerMiddleware, getFavorites); 
personRoutes.delete('/favorites/:id', authMiddleware, customerMiddleware, deleteFavorite); 
personRoutes.post('/favorites', authMiddleware,customerMiddleware ,addFavorite);
export default personRoutes;