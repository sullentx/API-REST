import connection from '../shared/config/database';
import { Bouquet } from '../models/bouquet';

export class BouquetRepository {
  
  public static async create(bouquet: Bouquet): Promise<number> {
    const query = 'INSERT INTO bouquet (name, type_name,details,price,quantity,is_precreated,image_url ,created_at,created_by,updated_at,updated_by,deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';

    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquet.name, bouquet.type_name,bouquet.details,bouquet.price,bouquet.quantity,bouquet.is_precreated, bouquet.image_url,bouquet.created_at,bouquet.created_by,bouquet.updated_at,bouquet.updated_by,bouquet.deleted], (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  public static async findById(bouquetId: number): Promise<Bouquet | null> {
    const query = 'SELECT * FROM bouquet WHERE id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bouquetId], (error: any, results: any) => {
        console.log(error)
        if (error) {
          reject(error);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  }

  public static async findAll(): Promise<Bouquet[]> {
    const query = 'SELECT * FROM bouquet WHERE deleted = false';
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
    const query = `
        UPDATE bouquet
        SET
            name = ?,
            type_name = ?,
            details = ?,
            price = ?,
            quantity = ?,
            is_precreated = ?,
            image_url = ?,
            created_at = ?,
            created_by = ?,
            updated_at = ?,
            updated_by = ?,
            deleted = ?
        WHERE id = ?`;
    return new Promise((resolve, reject) => {
        connection.execute(query, [bouquet.name,bouquet.type_name, bouquet.details, bouquet.price, bouquet.quantity, bouquet.is_precreated,bouquet.image_url,bouquet.created_at,bouquet.created_by,bouquet.updated_at,bouquet.updated_by,
            bouquet.deleted,
            bouquetId 
        ], (error: any) => {
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
  
}
