import connection from '../shared/config/database';
import { Carrito, CarritoItem } from '../models/carritoItems';

export class CarritoRepository {
  public static async create(carrito: Carrito): Promise<number> {
    const query = 'INSERT INTO carrito (customer_id, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [carrito.customer_id, carrito.created_at, carrito.created_by, carrito.updated_at, carrito.updated_by, carrito.deleted],
        (error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }

  public static async findById(carritoId: number): Promise<Carrito | null> {
    const query = 'SELECT * FROM carrito WHERE id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [carritoId], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  }

  public static async update(carritoId: number, carrito: Carrito): Promise<void> {
    const query = `
      UPDATE carrito
      SET customer_id = ?, created_at = ?, created_by = ?, updated_at = ?, updated_by = ?, deleted = ?
      WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [carrito.customer_id, carrito.created_at, carrito.created_by, carrito.updated_at, carrito.updated_by, carrito.deleted, carritoId],
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public static async delete(carritoId: number): Promise<void> {
    const query = 'UPDATE carrito SET deleted = true WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [carritoId], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public static async addItem(carritoItem: CarritoItem): Promise<number> {
    const query = 'INSERT INTO CarritoItems (carrito_id, bouquet_id, quantity, price, total, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [carritoItem.carrito_id, carritoItem.bouquet_id, carritoItem.quantity, carritoItem.price, carritoItem.total, carritoItem.created_at, carritoItem.created_by, carritoItem.updated_at, carritoItem.updated_by, carritoItem.deleted],
        (error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }

  public static async findItemsByCarritoId(carritoId: number): Promise<CarritoItem[]> {
    const query = 'SELECT * FROM CarritoItems WHERE carrito_id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [carritoId], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public static async updateItem(itemId: number, carritoItem: CarritoItem): Promise<void> {
    const query = `
      UPDATE CarritoItems
      SET carrito_id = ?, bouquet_id = ?, quantity = ?, price = ?, total = ?, created_at = ?, created_by = ?, updated_at = ?, updated_by = ?, deleted = ?
      WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [carritoItem.carrito_id, carritoItem.bouquet_id, carritoItem.quantity, carritoItem.price, carritoItem.total, carritoItem.created_at, carritoItem.created_by, carritoItem.updated_at, carritoItem.updated_by, carritoItem.deleted, itemId],
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public static async deleteItem(itemId: number): Promise<void> {
    const query = 'UPDATE CarritoItems SET deleted = true WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [itemId], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
