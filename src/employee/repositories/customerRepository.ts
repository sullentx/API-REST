import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Cliente } from '../models/customer';

export class CustomerRepository {

  public static async findAll(): Promise<Cliente[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT customer_id, role_id_fk, email FROM cliente', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const clientes: Cliente[] = results as Cliente[];
          resolve(clientes);
        }
      });
    });
  }

  public static async findById(customer_id: number): Promise<Cliente | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cliente WHERE customer_id = ?', [customer_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const clientes: Cliente[] = results as Cliente[];
          if (clientes.length > 0) {
            resolve(clientes[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByEmail(email: string): Promise<Cliente | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cliente WHERE email = ?', [email], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const clientes: Cliente[] = results as Cliente[];
          if (clientes.length > 0) {
            resolve(clientes[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createCustomer(cliente: Cliente): Promise<Cliente> {
    const query = 'INSERT INTO cliente (email, role_id_fk, password_cliente) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [cliente.email, cliente.role_id_fk, cliente.password_cliente], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdCustomerId = result.insertId;
          const createdCustomer: Cliente = { ...cliente, customer_id: createdCustomerId };
          resolve(createdCustomer);
        }
      });
    });
  }

  public static async updateCustomer(customer_id: number, customerData: Cliente): Promise<Cliente | null> {
    const query = 'UPDATE cliente SET email = ?, password_cliente = ?, role_id_fk = ? WHERE customer_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [customerData.email, customerData.password_cliente,customerData.role_id_fk,customer_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedCustomer: Cliente = { ...customerData, customer_id: customer_id };
            resolve(updatedCustomer);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteCustomer(customer_id: number): Promise<boolean> {
    const query = 'DELETE FROM cliente WHERE customer_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [customer_id], (error, result: ResultSetHeader) => {
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
