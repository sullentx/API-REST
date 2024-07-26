import { Request, Response } from 'express';
import { CarritoService } from '../services/carritoService';

export const createCarrito = async (req: Request, res: Response) => {
  try {
    const carrito = await CarritoService.createCarrito(req.body);
    res.status(201).json(carrito);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCarritoById = async (req: Request, res: Response) => {
  try {
    const carrito = await CarritoService.getCarritoById(Number(req.params.id));
    if (carrito) {
      res.status(200).json(carrito);
    } else {
      res.status(404).json({ message: 'Carrito not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCarrito = async (req: Request, res: Response) => {
  try {
    await CarritoService.updateCarrito(Number(req.params.id), req.body);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCarrito = async (req: Request, res: Response) => {
  try {
    await CarritoService.deleteCarrito(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addItemToCarrito = async (req: Request, res: Response) => {
  try {
    const carritoItem = await CarritoService.addItemToCarrito(req.body);
    res.status(201).json(carritoItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemsByCarritoId = async (req: Request, res: Response) => {
  try {
    const items = await CarritoService.getItemsByCarritoId(Number(req.params.carritoId));
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCarritoItem = async (req: Request, res: Response) => {
  try {
    await CarritoService.updateCarritoItem(Number(req.params.itemId), req.body);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCarritoItem = async (req: Request, res: Response) => {
  try {
    await CarritoService.deleteCarritoItem(Number(req.params.itemId));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
