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

  public static async findById(name: string): Promise<Flower | null> {
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

  public static async createFlower(flower: Flower): Promise<Flower> {
    const query = 'INSERT INTO flower (name, price, color,quantity) VALUES (?,?,?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [flower.name, flower.price, flower.color,flower.quantity], (error, result: ResultSetHeader) => {
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

  public static async updateFlower(name: string, flowerData: Flower): Promise<Flower | null> {
    const query = 'UPDATE flower SET name = ?, price = ?, color = ? , quantity = ? WHERE name = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [flowerData.name, flowerData.price, flowerData.color , flowerData.quantity, name], (error, result: ResultSetHeader) => {
        if (error) {
          console.log(error)
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedFlower: Flower = { ...flowerData, name: name };
            resolve(updatedFlower);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteFlower(name: string): Promise<boolean> {
    const query = 'DELETE FROM flower WHERE name = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [name], (error, result: ResultSetHeader) => {
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