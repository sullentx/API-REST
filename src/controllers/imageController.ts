import { Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import { AuthRequest } from '../shared/config/types/authRequest';
import { BouquetImageService } from '../services/imageService'


// Configuración de multer 
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Directorio donde se almacenarán las imágenes
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const uploadBouquetImage = upload.single('image');

export const createBouquetImage = async (req: AuthRequest, res: Response) => {
  try {
    const { bouquetId } = req.body;
    const imageUrl = req.file ? path.join('uploads', req.file.filename) : '';
    console.log(imageUrl)
    if(!imageUrl){
      return res.status(400).send('Add image please');
    }
    if (!bouquetId) {
      return res.status(400).send('Bouquet ID is required');
    }

    const createdBy = req.personData?.email || 'system';

    const image = await BouquetImageService.addImage(parseInt(bouquetId, 10), imageUrl, createdBy);
    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getImagesByBouquetId = async (req: Request, res: Response) => {
  try {
    const images = await BouquetImageService.getImagesByBouquetId(parseInt(req.params.id, 10));
    res.status(200).json(images);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
