import { FlowerRepository } from '../repositories/flowerRepository';
import { Flower } from '../models/flowerModel';
import { DateUtils } from '../shared/utils/DateUtils';
import * as dotenv from 'dotenv';

dotenv.config();

export class FlowerService {

  public static async getFlowers(): Promise<Flower[]> {
    return FlowerRepository.findAll();
  }

  public static async getFlowerby(name: string): Promise<Flower | null> {
    return FlowerRepository.findByName(name);
  }

  public static async createFlower(flower: Flower, file: Express.Multer.File, userEmail:string) {
    const urlProject = process.env.URL;
    const portProject = process.env.PORT;
    try {
      flower.id = flower.id;
      flower.name = flower.name;
      flower.color = flower.color;
      flower.price = flower.price;
      flower.quantity = flower.quantity;
      flower.created_at = DateUtils.formatDate(new Date());
      flower.created_by = userEmail;
      flower.updated_at = DateUtils.formatDate(new Date());
      flower.updated_by = userEmail;
      flower.deleted = false;
      flower.image_url = `${urlProject}:${portProject}/uploads/${file.filename}`;
      const flowerId= await FlowerRepository.createFlower(flower);
      flower.id = flowerId;
      return flower;
    } catch (error: any) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }
  
  public static async updateFlower(flowerId: number, updatedItem: Flower, file: Express.Multer.File,userEmail:string) {
    const flowerFound = await FlowerRepository.findById(flowerId);
    if (flowerFound) {
       flowerFound.name = updatedItem.name;
       flowerFound.price = updatedItem.price;
       flowerFound.color = updatedItem.color;
       flowerFound.quantity = updatedItem.quantity;
      flowerFound.updated_at = DateUtils.formatDate(new Date());
      flowerFound.updated_by = userEmail;
      flowerFound.deleted = false;
      console.log(updatedItem.deleted)
      if (file) {
        const urlProject = process.env.URL;
        const portProject = process.env.PORT;
        flowerFound.image_url = `${urlProject}:${portProject}/uploads/${file.filename}`;
      }
  /* 
   bouquetFound.name = bouquet.name;
      bouquetFound.type_name = bouquet.type_name;
      bouquetFound.details = bouquet.details;
      bouquetFound.quantity = bouquet.quantity;
      bouquetFound.is_precreated = bouquet.is_precreated;
      bouquetFound.created_at = bouquetFound.created_at;
      bouquetFound.created_by = bouquetFound.created_by;
      bouquetFound.updated_at = DateUtils.formatDate(new Date());
      bouquetFound.updated_by = userEmail;
      bouquetFound.deleted = bouquetFound.deleted; */
      // Actualizar la flor en la base de datos
      await FlowerRepository.updateFlower(flowerId, flowerFound);
    } else {
      throw new Error('Flower not found');
    }
  }
  
  public static async deleteFlower(flowerId: number): Promise<void> {
    try {
      const flowerFound = await FlowerRepository.findById(flowerId);
      if (flowerFound) {
        await FlowerRepository.deleteFlower(flowerId);
      } else {
        throw new Error('Flower not found');
      }
    } catch (error: any) {
      throw new Error(`Error al eliminar la flor: ${error.message}`);
    }
  }
  
  
}

