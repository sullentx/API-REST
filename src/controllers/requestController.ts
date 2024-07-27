import { Request, Response } from 'express';
import { RequestService } from '../services/requestService';
import { AuthRequest } from '../shared/config/types/authRequest';

export const getRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await RequestService.getAllRequests();
    res.status(200).json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  try {
    const request = await RequestService.getRequestById(parseInt(req.params.id, 10));
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRequest = async (req: AuthRequest, res: Response) => {
  console.log(req.body)
  try {
    if(!req.personData){
      return res.status(401).send('User data not available.');

    }
    const newRequest = await RequestService.createRequest(req.body, req.personData.email,req.personData.id);
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const updatedRequest = await RequestService.updateRequest(parseInt(req.params.id, 10), req.body);
    if (updatedRequest) {
      res.status(200).json(updatedRequest);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const deleted = await RequestService.deleteRequest(parseInt(req.params.id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Request deleted' });
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = parseInt(req.params.id, 10);
    const { status_id } = req.body;
    if(!req.personData){
      return res.status(404).json({message: 'person data not found'})
    }
    
    const updatedRequest = await RequestService.updateRequestStatus(requestId, status_id, req.personData.email);
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(updatedRequest);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
