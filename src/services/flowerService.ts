import { FlowerRepository } from '../repositories/flowerRepository';
import { Flower } from '../models/flowerModel';

export class FlowerService {
  public static async getFlowers(): Promise<Flower[]> {
    return FlowerRepository.findAll();
  }

  public static async getFlowerbyId(name: string): Promise<Flower | null> {
    return FlowerRepository.findById(name);
  }

  public static async createFlower(newItem: Flower): Promise<Flower> {
    return FlowerRepository.createFlower(newItem);
  }

  public static async updateFlower(name: string, updatedItem: Flower): Promise<Flower | null> {
    console.log(updatedItem);
    return FlowerRepository.updateFlower(name, updatedItem);
    
  }

  public static async deleteFlower(name: string): Promise<boolean> {
    return FlowerRepository.deleteFlower(name);
  }
}

