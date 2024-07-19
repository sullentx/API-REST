// src/config/types/authRequest.ts
import { Request } from 'express';
import { PersonPayload } from './personPayLoad'; // Ajusta la ruta según la ubicación del archivo personPayload

export interface AuthRequest extends Request {
  personData?: PersonPayload;
}
