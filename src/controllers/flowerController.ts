import { Request, Response } from 'express';
import { FlowerService } from '../services/flowerService';
import { Flower } from '../models/flowerModel'; 
import { AuthRequest } from '../shared/config/types/authRequest';

export const getFlowers = async (_req: Request, res: Response): Promise<void> => {
  console.log(res)
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

export const createFlower = async (req: AuthRequest, res: Response) => {
  try {
    console.log(req.personData);
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);
    if(!req.file){
      console.log(req.file);
      return res.status(400).send('no file uploaded.')
    }
    if(!req.personData){
      console.log(req.personData);
      return res.status(400).send('No data provied')
    }
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);
    console.log('Person data:', req.personData);
    const newFlower = await FlowerService.createFlower(req.body, req.file,req.personData.email);
    console.log(newFlower)
    if(newFlower){
      res.status(201).json(newFlower)
    }else {
      console.log(newFlower)
      res.status(404).json({message: 'Algo salio mal'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Error al crear la flor');
  }
};

export const updateFlower = async (req: AuthRequest, res: Response) => {
  try {
    const flowerId = parseInt(req.params.id, 10);
    if(!req.file){
      return res.status(400).send('no file provied');
    }
    if(!req.personData){
      return res.status(400).send('no data provied');
    }
    if (isNaN(flowerId)) {
      res.status(400).send('Invalid ID');
      return;
    }

    const updatedFlower: Flower = req.body;
    const file = req.file;

    await FlowerService.updateFlower(flowerId, updatedFlower, file,req.personData.email);
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
