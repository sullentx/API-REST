import { ResultSetHeader } from 'mysql2';
import connection from '../shared/config/database';
import { Favorite } from '../models/favorite';

export class FavoriteRepository {
  public static async findByUserId(customer_id: number): Promise<Favorite[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM favorites WHERE customer_id = ?', [customer_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const favorites: Favorite[] = results as Favorite[];
          resolve(favorites);
        }
      });
    });
  }

  public static async deleteFavorite(userId: number, favoriteId: number): Promise<boolean> {
    const query = 'DELETE FROM favorites WHERE customer_id = ? AND id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userId, favoriteId], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public static async addFavorite(customerId: number, bouquetId: number): Promise<number> {
    const query = 'INSERT INTO Favorites (customer_id, bouquet_id) VALUES (?, ?)';
  
    return new Promise((resolve, reject) => {
      connection.execute(query, [customerId, bouquetId], (error: any, results: ResultSetHeader) => {
        if (error) {
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  }


}

