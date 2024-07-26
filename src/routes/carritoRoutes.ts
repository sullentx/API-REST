import { Router } from 'express';
import { createCarrito, getCarritoById, updateCarrito, deleteCarrito, addItemToCarrito, getItemsByCarritoId, updateCarritoItem, deleteCarritoItem } from '../controllers/carritoController';
import { authMiddleware } from '../shared/middlewares/auth';

const router = Router();

router.post('/carrito', authMiddleware, createCarrito);
router.get('/carrito/:id', authMiddleware, getCarritoById);
router.put('/carrito/:id', authMiddleware, updateCarrito);
router.delete('/carrito/:id', authMiddleware, deleteCarrito);

router.post('/carrito/:carritoId/items', authMiddleware, addItemToCarrito);
router.get('/carrito/:carritoId/items', authMiddleware, getItemsByCarritoId);
router.put('/carrito/items/:itemId', authMiddleware, updateCarritoItem);
router.delete('/carrito/items/:itemId', authMiddleware, deleteCarritoItem);

export default router;
