import { BouquetRepository } from '../repositories/bouquetRepository';
import { Bouquet, BouquetImage } from '../models/bouquet';
import { DateUtils } from '../shared/utils/DateUtils'; 

export class BouquetService {

  public static async addBouquet(bouquet: Bouquet): Promise<Bouquet> {
    bouquet.created_at = DateUtils.formatDate(new Date());
    bouquet.updated_at = DateUtils.formatDate(new Date());
    bouquet.created_by = bouquet.created_by || 'Administrador';
    bouquet.updated_by = bouquet.updated_by || 'Administrador';
    
    const bouquetId = await BouquetRepository.create(bouquet);
    bouquet.id = bouquetId;
    return bouquet;
  }

  public static async getBouquetById(bouquetId: number): Promise<Bouquet | null> {
    return await BouquetRepository.findById(bouquetId);
  }

  public static async getAllBouquets(): Promise<Bouquet[]> {
    return await BouquetRepository.findAll();
  }

  public static async modifyBouquet(bouquetId: number, bouquet: Bouquet): Promise<void> {
    bouquet.updated_at = DateUtils.formatDate(new Date());
    await BouquetRepository.update(bouquetId, bouquet);
  }

  public static async deleteBouquet(bouquetId: number): Promise<void> {
    await BouquetRepository.delete(bouquetId);
  }
  public static async getBouquetByIdWithImages(bouquetId: number): Promise<{bouquet: Bouquet, images: BouquetImage[]}> {
    return await BouquetRepository.findByIdWithImages(bouquetId);
  }
}
