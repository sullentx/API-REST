import { Request, Response } from 'express';
import { BouquetService } from '../services/BouquetService';

export const createBouquet = async (req: Request, res: Response) => {
  try {
    const newBouquet = await BouquetService.addBouquet(req.body);
    res.status(201).json(newBouquet);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBouquetById = async (req: Request, res: Response) => {
  try {
    const bouquet = await BouquetService.getBouquetById(parseInt(req.params.id, 10));
    if (bouquet) {
      res.status(200).json(bouquet);
    } else {
      res.status(404).json({ message: 'Bouquet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBouquets = async (_req: Request, res: Response) => {
  try {
    const bouquets = await BouquetService.getAllBouquets();
    res.status(200).json(bouquets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBouquet = async (req: Request, res: Response) => {
  try {
    await BouquetService.modifyBouquet(parseInt(req.params.id, 10), req.body);
    res.status(200).json({ message: 'Bouquet updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBouquet = async (req: Request, res: Response) => {
  try {
    await BouquetService.deleteBouquet(parseInt(req.params.id, 10));
    res.status(200).json({ message: 'Bouquet deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBouquetByIdWithImages = async (req: Request, res: Response) => {
  try {
    const bouquetWithImages = await BouquetService.getBouquetByIdWithImages(parseInt(req.params.id, 10));
    res.status(200).json(bouquetWithImages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};