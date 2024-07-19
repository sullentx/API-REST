import { FlowerRepository } from '../repositories/flowerRepository';
import { Flower } from '../models/flowerModel';

export class FlowerService {
  public static async getFlowers(): Promise<Flower[]> {
    return FlowerRepository.findAll();
  }

  public static async getFlowerbyId(id: number): Promise<Flower | null> {
    return FlowerRepository.findById(id);
  }

  public static async createFlower(newItem: Flower): Promise<Flower> {
    return FlowerRepository.createFlower(newItem);
  }

  public static async updateFlower(id: number, updatedItem: Flower): Promise<Flower | null> {
    return FlowerRepository.updateFlower(id, updatedItem);
  }

  public static async deleteFlower(id: number): Promise<boolean> {
    return FlowerRepository.deleteFlower(id);
  }
}

