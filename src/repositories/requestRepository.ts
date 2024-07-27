import { ResultSetHeader } from 'mysql2';
import connection from '../shared/config/database';
import { RequestB} from '../models/request';

export class RequestRepository {
  public static async findAll(): Promise<RequestB[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM request', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const requests: RequestB[] = results as RequestB[];
          resolve(requests);
        }
      });
    });
  }

  public static async findById(id: number): Promise<RequestB | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM request WHERE id = ?', [id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const requests: RequestB[] = results as RequestB[];
          if (requests.length > 0) {
            resolve(requests[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async create(request: RequestB): Promise<RequestB> {
    const query = 'INSERT INTO request (customer_id, bouquet_id, quantity, price, total, status_id, delivery_man_id, request_date, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [request.customer_id, request.bouquet_id, request.quantity, request.price, request.total, request.status_id, request.delivery_man_id, request.request_date, request.created_at, request.created_by, request.updated_at, request.updated_by, request.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdRequestId = result.insertId;
          const createdRequest: RequestB = { ...request, id: createdRequestId };
          resolve(createdRequest);
        }
      });
    });
  }

  public static async update(id: number, requestData: RequestB): Promise<RequestB | null> {
    const query = 'UPDATE request SET customer_id = ?, bouquet_id = ?, quantity = ?, price = ?, total = ?, status_id = ?, delivery_man_id = ?, request_date = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [requestData.customer_id, requestData.bouquet_id, requestData.quantity, requestData.price, requestData.total, requestData.status_id, requestData.delivery_man_id, requestData.request_date, requestData.updated_at, requestData.updated_by, requestData.deleted, id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedRequest: RequestB = { ...requestData, id };
            resolve(updatedRequest);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM request WHERE id = ?';
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
