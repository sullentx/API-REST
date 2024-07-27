import { Request, Response } from 'express';
import { BouquetService } from '../services/BouquetService';
import { AuthRequest } from '../shared/config/types/authRequest';


export const createBouquet = async (req: AuthRequest, res: Response) => {
  console.log(req.file);
    console.log(req.body);
    console.log(req.personData)
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    if (!req.personData) {
      return res.status(401).send('User data not available.');
    }
    const newProduct = await BouquetService.addBouquet(req.body, req.file,req.personData.email);
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }

};

export const getBouquetById = async (req: Request, res: Response) => {
  try {
    const bouquet = await BouquetService.getBouquetById(parseInt(req.params.id, 10));
    
    if (bouquet) {
      res.status(200).json(bouquet);
    } else {
      res.status(404).json({ message: 'Bouquet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBouquets = async (_req: Request, res: Response) => {
  try {
    const bouquets = await BouquetService.getAllBouquets();
    res.status(200).json(bouquets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBouquet = async (req: AuthRequest, res: Response) => {
  try {
    if(!req.personData){
      return res.status(401).send('User data not available.');
    }
    if(!req.file){
      return res.status(401).send('File not available.');
    }
    await BouquetService.modifyBouquet(parseInt(req.params.id, 10), req.body,req.file,req.personData.email);
    res.status(200).json({ message: 'Bouquet updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBouquet = async (req: Request, res: Response) => {
  try {
    await BouquetService.deleteBouquet(parseInt(req.params.id, 10));
    res.status(200).json({ message: 'Bouquet deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCustomBouquet = async (req: AuthRequest, res: Response) => {
  console.log(req.personData)
console.log(req.body)
  try {
    if (!req.personData) {
      return res.status(401).send('User data not available.');
    }

    const { name, type_name, details, flower_quantity, is_precreated, image_url, flowers } = req.body;

    const newBouquet = {
      id: 0,
      name: name,
      type_name: type_name,
      details: details,
      price: 0,
      quantity: flower_quantity,
      flower_quantity: flowers,
      is_precreated: is_precreated,
      image_url: image_url,
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: '',
      deleted: false
    };
    console.log(newBouquet)
    const createdBouquet = await BouquetService.createCustomBouquet(newBouquet, flowers, req.personData.email);

    if (createdBouquet) {
      res.status(201).json(createdBouquet);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


