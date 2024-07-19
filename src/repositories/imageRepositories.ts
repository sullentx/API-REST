import connection from '../shared/config/database';
import { BouquetImage } from '../models/image';

export class BouquetImageRepository {
  public static async create(image: BouquetImage): Promise<number> {
    const query = 'INSERT INTO BouquetImages (bouquet_id, image_url, created_by) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [image.bouquet_id, image.image_url, image.created_by], (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  public static async findByBouquetId(bouquetId: number): Promise<BouquetImage[]> {
    const query = 'SELECT * FROM BouquetImages WHERE bouquet_id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquetId], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
