import { Response, NextFunction } from 'express';
import { AuthRequest } from '../config/types/authRequest';

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.personData?.role_id!== 1) {
    console.log(req);
    return res.status(403).json({ message: 'Access denied. Admins only' });
  }
  next();
};

export const customerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.personData?.role_id !== 2) {
    return res.status(403).json({ message: 'Access denied. Customers only' });
  }
  next();
};

export const deliveryManMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.personData?.role_id !== 3) {
    return res.status(403).json({ message: 'Access denied. Delivery Men only' });
  }
  next();
};
