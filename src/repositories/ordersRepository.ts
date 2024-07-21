import connection from "../shared/config/database";
import { Orders } from "../models/orders";
import { ResultSetHeader } from 'mysql2';

export class ordersRepository {

    public static async findByUserId(userId: number): Promise<Orders[]> {
      return new Promise((resolve, reject) => {
        connection.query('SELECT o.id, o.order_date, o.total, s.status_name FROM `Order` o JOIN status s ON o.delivery_status = s.id WHERE o.customer_id = ? AND o.deleted = false;',
         [userId], (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const orders: Orders[] = results as Orders[];
            resolve(orders);
          }
        }); 
      });
    }

    public static async updateOrder(userId: number, favoriteId: number): Promise<boolean> {
      const query = 'PUT FROM orders WHERE customer_id = ? AND stattus_id = ?';
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
  }