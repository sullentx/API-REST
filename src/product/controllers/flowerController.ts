import { Request, Response } from 'express';
import { FlowerService } from '../services/flowerService';
import { Flower } from '../models/flowerModel'; 

export const getFlowers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const flowers = await FlowerService.getFlowers(); 
    res.json(flowers);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};

export const getFlowerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const flower = await FlowerService.getFlowerbyId(parseInt(req.params.id, 10)); 
    if (flower) {
      res.status(200).json(flower);
    } else {
      res.status(404).json({ message: 'Flower not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createFlower = async (req: Request, res: Response): Promise<void> => {
  try {
    const newFlower: Flower = req.body;
    await FlowerService.createFlower(newFlower); 
    res.status(201).send('Flower creado');
  } catch (err) {
    res.status(500).send('Error al crear el flower');
  }
};

export const updateFlower = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedFlower: Flower = req.body;
    await FlowerService.updateFlower(parseInt(req.params.id, 10), updatedFlower); 
    res.send('Flower actualizado');
  } catch (err) {
    res.status(500).send('Error al actualizar el flower');
  }
};

export const deleteFlower = async (req: Request, res: Response): Promise<void> => {
  try {
    await FlowerService.deleteFlower(parseInt(req.params.id, 10)); 
    res.send('Flower eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar el flower');
  }
};
