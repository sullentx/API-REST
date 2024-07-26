import connection from "../shared/config/database";
import { ResultSetHeader } from 'mysql2';
import { Request } from "../models/request";

export class requestRepository {
  /* 
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
  } */

    public static async createRequest(request: Request): Promise<number> {
      // Verificar si el customer_id existe en la tabla person y tiene role_id = 2
      const checkCustomerQuery = 'SELECT COUNT(*) as count FROM person WHERE id = ? AND role_id = 2';
      const [rows]: any = await connection.promise().execute(checkCustomerQuery, [request.customer_id]);
      
      if (rows[0].count === 0) {
          throw new Error(`Customer with ID ${request.customer_id} does not exist or is not a customer`);
      }
  
      const query = 'INSERT INTO request (customer_id, delivery_man_id, request_date, total, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      
      // Reemplazar undefined con null
      const params = [
          request.customer_id,
          request.delivery_man_id,
          request.request_date,
          request.total,
          request.created_at,
          request.created_by,
          request.updated_at,
          request.updated_by,
          request.deleted 
      ];
      console.log(params)
      return new Promise((resolve, reject) => {
          connection.execute(query, params, (error: any, result: any) => {
            console.log(error)
              if (error) {
                  reject(error);
              } else {
                  resolve(result.insertId);
              }
          });
      });
  }


    public static async findByUserId(userId: number): Promise<Request[]> {
      return new Promise((resolve, reject) => {
        connection.query('SELECT o.id, o.order_date, o.total, s.status_name FROM `Order` o JOIN status s ON o.delivery_status = s.id WHERE o.customer_id = ? AND o.deleted = false;',
         [userId], (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const orders: Request[] = results as Request[];
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
    public static getStatusIdByName = async (statusName: string): Promise<number | null> => {
      const query = 'SELECT id FROM status WHERE status_name = ?';
      
      return new Promise((resolve, reject) => {
        connection.execute(query, [statusName], (error: any, results: any) => {
          if (error) {
            reject(error);
          } else if (results.length > 0) {
            resolve(results[0].id);
          } else {
            resolve(null); // Nombre de estado no encontrado
          }
        });
      });
    };
  }