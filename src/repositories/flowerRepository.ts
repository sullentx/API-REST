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

  public static async findById(id: number): Promise<Flower | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM flower WHERE id = ?', [id], (error: any, results) => {
        if (error) {
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

  public static async createFlower(flower: Flower): Promise<Flower> {
    const query = 'INSERT INTO flower (name, price, color) VALUES (?,?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [flower.name, flower.price, flower.color], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdFlowerId = result.insertId;
          const createdFlower: Flower = { ...flower, flower_id: createdFlowerId };
          resolve(createdFlower);
        }
      });
    });
  }

  public static async updateFlower(flower_id: number, flowerData: Flower): Promise<Flower | null> {
    const query = 'UPDATE flower SET name = ?, price = ?, color = ? WHERE flower_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [flowerData.name, flowerData.price, flowerData.color ,flower_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedFlower: Flower = { ...flowerData, flower_id: flower_id };
            resolve(updatedFlower);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteFlower(id: number): Promise<boolean> {
    const query = 'DELETE FROM flower WHERE flower_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [id], (error, result: ResultSetHeader) => {
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