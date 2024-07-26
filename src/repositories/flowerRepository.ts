import { ResultSetHeader } from 'mysql2';
import connection from '../shared/config/database';
import { Flower } from '../models/flowerModel';

export class FlowerRepository {

  public static async findAll(): Promise<Flower[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM flower', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const flowers: Flower[] = results as Flower[];
          resolve(flowers);
        }
      });
    });
  }

  public static async findByName(name: string): Promise<Flower | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM flower WHERE name LIKE ?', [`%${name}%`], (error: any, results) => {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          const flowers: Flower[] = results as Flower[];
          if (flowers.length > 0) {
            resolve(flowers[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  public static async findById(flowerId: number): Promise<Flower | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM flower WHERE id = ?', [flowerId], (error: any, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const flowers: Flower[] = results as Flower[];
          if (flowers.length > 0) {
            resolve(flowers[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  
  

  public static async createFlower(flower: Flower): Promise<number> {
    const query = 'INSERT INTO flower (name, price, color, quantity, created_at, created_by, updated_at, updated_by, deleted, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [
          flower.name,
          flower.price,
          flower.color,
          flower.quantity,
          flower.created_at,
          flower.created_by,
          flower.updated_at,
          flower.updated_by,
          flower.deleted,
          flower.image_url
        ],
        (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }

    public static async updateFlower(flowerId: number, updatedItem: Flower): Promise<Flower | null> {
      console.log('ID:', flowerId);
      console.log('Updated Item:', updatedItem);
    
      const query = 'UPDATE flower SET name = ?, price = ?, color = ?, quantity = ?, updated_at = ?, updated_by = ?, deleted = ?, image_url = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
        connection.execute(
          query,
          [
            updatedItem.name,
            updatedItem.price,
            updatedItem.color,
            updatedItem.quantity,
            updatedItem.updated_at,
            updatedItem.updated_by,
            updatedItem.deleted,
            updatedItem.image_url,
            flowerId
          ],
          (error, result: ResultSetHeader) => {
            if (error) {
              console.log('Error:', error);
              reject(error);
            } else {
              if (result.affectedRows === 0) {
                resolve(null);
              } else {
                const updatedFlower: Flower = { ...updatedItem, id: flowerId };
                resolve(updatedFlower);
              }
            }
          }
        );
      });
    }
    

  public static async deleteFlower(flowerId: number): Promise<boolean> {
    const query = 'DELETE FROM flower WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [flowerId], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

}