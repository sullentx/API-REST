import { Request, Response } from 'express';
import { FavoriteService } from '../services/favoriteService';
import { PersonPayload } from '../shared/config/types/personPayLoad';
import { requestRepository } from '../repositories/requestRepository';
import { DateUtils } from '../shared/utils/DateUtils';
interface CustomRequest extends Request {
  personData?: PersonPayload;
}

export const createRequest = async (req: Request, res: Response) => {
  try {
    
    const statusId = await requestRepository.getStatusIdByName(req.body.status_name);
    if (!statusId) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    // Preparar el cuerpo de la solicitud con el status_id
    const requestBody = {
      ...req.body,
      status_id: statusId,
      request_date: DateUtils.formatDate(new Date()),
      created_at: DateUtils.formatDate(new Date()),
      updated_at: DateUtils.formatDate(new Date()),
      created_by: req.body.created_by ?? 'default_user',
      updated_by: req.body.updated_by ?? 'default_user',
      deleted: req.body.deleted ?? false
    };

    const newRequest = await requestRepository.createRequest(requestBody);
    console.log(newRequest)
    if (newRequest) {
      res.status(201).json({ id: newRequest });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req: CustomRequest, res: Response) => {
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


export const updateOrderStatus = async (req: CustomRequest, res: Response) => {
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
};