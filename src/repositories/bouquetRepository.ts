import connection from '../shared/config/database';
import { Bouquet, BouquetImage } from '../models/bouquet';

export class BouquetRepository {
  public static async create(bouquet: Bouquet): Promise<number> {
    const query = 'INSERT INTO Bouquet (name, is_precreated, created_by) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquet.name, bouquet.is_precreated, bouquet.created_by], (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  public static async findById(bouquetId: number): Promise<Bouquet | null> {
    const query = 'SELECT * FROM Bouquet WHERE id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquetId], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  }

  public static async findAll(): Promise<Bouquet[]> {
    const query = 'SELECT * FROM Bouquet WHERE deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public static async update(bouquetId: number, bouquet: Bouquet): Promise<void> {
    const query = 'UPDATE Bouquet SET name = ?, is_precreated = ?, updated_by = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquet.name, bouquet.is_precreated, bouquet.updated_by, bouquetId], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public static async delete(bouquetId: number): Promise<void> {
    const query = 'UPDATE Bouquet SET deleted = true WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquetId], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  
  public static async findAllWithImages(): Promise<Bouquet[]> {
    const query = `
      SELECT b.id, b.name, b.is_precreated, bi.id AS image_id, bi.image_url
      FROM Bouquet b
      LEFT JOIN BouquetImage bi ON b.id = bi.bouquet_id
      WHERE b.deleted = false
      ORDER BY b.id;
    `;
    return new Promise((resolve, reject) => {
      connection.execute(query, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          const bouquets: Bouquet[] = [];
          let currentBouquet: Bouquet | undefined;
          results.forEach((row: any) => {
            if (!currentBouquet || currentBouquet.id !== row.id) {
              if (currentBouquet) {
                bouquets.push(currentBouquet);
              }
              currentBouquet = {
                id: row.id,
                name: row.name,
                is_precreated: row.is_precreated,
                image: [],
              };
            }
            if (row.image_id) {
              currentBouquet.image.push({
                id: row.image_id,
                image_url: row.image_url,
              });
            }
          });
          if (currentBouquet) {
            bouquets.push(currentBouquet);
          }
          resolve(bouquets);
        }
      });
    });
  }
  public static async findByIdWithImages(bouquetId: number): Promise<{bouquet: Bouquet, images: BouquetImage[]}> {
    const bouquetQuery = 'SELECT * FROM Bouquet WHERE id = ? AND deleted = false';
    const imagesQuery = 'SELECT * FROM BouquetImages WHERE bouquet_id = ? AND deleted = false';

    return new Promise((resolve, reject) => {
      connection.query(bouquetQuery, [bouquetId], (error: any, bouquetResults: any) => {
        if (error) {
          reject(error);
        } else if (bouquetResults.length === 0) {
          reject(new Error('Bouquet not found'));
        } else {
          const bouquet = bouquetResults[0];
          connection.query(imagesQuery, [bouquetId], (imageError: any, imageResults: any) => {
            if (imageError) {
              reject(imageError);
            } else {
              const images = imageResults as BouquetImage[];
              resolve({ bouquet, images });
            }
          });
        }
      });
    });
  }
}
