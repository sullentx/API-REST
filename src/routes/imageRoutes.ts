import { Router } from 'express';
import { createBouquetImage, uploadBouquetImage, getImagesByBouquetId } from '../controllers/imageController';
import { authMiddleware } from '../shared/middlewares/auth';
import { adminMiddleware } from '../shared/middlewares/roleMiddleware';
const imageRouter = Router();

imageRouter.post('/upload', authMiddleware,adminMiddleware,uploadBouquetImage,createBouquetImage);
imageRouter.get('/:id', getImagesByBouquetId);

export default imageRouter;
