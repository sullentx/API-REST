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
    const flower = await FlowerService.getFlowerby((req.params.name)); 
    if (flower) {
      res.status(200).json(flower);
    } else {
      console.log(flower)
      res.status(404).json({ message: 'Flower not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createFlower = async (req: Request, res: Response) => {
  try {
    if(!req.file){
      return res.status(400).send('no file uploaded.')
    }
    const newFlower = await FlowerService.createFlower(req.body, req.file);
    console.log(newFlower)
    if(newFlower){
      res.status(201).json(newFlower)
    }else {
      res.status(404).json({message: 'Algo salio mal'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Error al crear la flor');
  }
};

export const updateFlower = async (req: Request, res: Response): Promise<void> => {
  try {
    const flowerId = parseInt(req.params.id, 10);
    if (isNaN(flowerId)) {
      res.status(400).send('Invalid ID');
      return;
    }

    const updatedFlower: Flower = req.body;
    const file = req.file;

    await FlowerService.updateFlower(flowerId, updatedFlower, file);
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
