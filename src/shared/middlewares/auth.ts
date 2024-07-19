import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PersonRepository } from '../../repositories/personRepository';
import { PersonPayload } from '../config/types/personPayLoad';
import { AuthRequest } from '../config/types/authRequest';

dotenv.config();



const secretKey = process.env.SECRET || "";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as PersonPayload;
    const person = await PersonRepository.findById(payload.id);

    if (!person) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.personData = { ...payload, role_id: person.role_id };
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};