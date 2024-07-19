// src/controllers/favoriteController.ts
import { Request, Response } from 'express';
import { FavoriteService } from '../services/favoriteService';
import { PersonPayload } from '../shared/config/types/personPayLoad';

interface CustomRequest extends Request {
  personData?: PersonPayload;
}

export const getFavorites = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.personData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const favorites = await FavoriteService.getFavorites(req.personData.id);
    res.status(200).json(favorites);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFavorite = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.personData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const result = await FavoriteService.deleteFavorite(req.personData.id, parseInt(req.params.id, 10));
    if (result) {
      res.status(200).json({ message: 'Favorite deleted' });
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export const addFavorite = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.personData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { bouquetId } = req.body;
    const favorite = await FavoriteService.addFavorite(req.personData.id, bouquetId);
    res.status(201).json(favorite);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


