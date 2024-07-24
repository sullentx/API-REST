import { FavoriteRepository } from '../repositories/favoriteRepository';
import { Favorite } from '../models/favorite';
export class FavoriteService {

  public static async getFavorites(userId: number) {
    return await FavoriteRepository.findByUserId(userId);
  }

  public static async deleteFavorite(userId: number, favoriteId: number) {
    return await FavoriteRepository.deleteFavorite(userId, favoriteId);
  }

  public static async addFavorite(customerId: number, bouquetId: number): Promise<Favorite> {
    const favoriteId = await FavoriteRepository.addFavorite(customerId, bouquetId);
    return {
      id: favoriteId,
      customer_id: customerId,
      bouquet_id: bouquetId,
    };
  }
  
}
