import { CustomerRepository } from "../repositories/customerRepository";
import { Cliente } from "../models/customer";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class CustomerService {

  public static async login(email: string, password: string): Promise<string | null> {
    try {
      const customer = await this.getCustomerByEmail(email);
      if (!customer) {
        return null;
      }
      console.log('Password received:', password);
      console.log('Customer password:', customer.password_cliente);
      const passwordMatch = await bcrypt.compare(password, customer.password_cliente);

      if (!passwordMatch) {
        return null;
      }

      const payload = {
        customer_id: customer.customer_id,
        role_id_fk: customer.role_id_fk,
        email: customer.email
      };
      return jwt.sign(payload, secretKey, { expiresIn: '1500m' });

    } catch (error: any) {
      throw new Error(`Error al logearse: ${error.message}`);
    }
  }

  public static async getAllCustomers(): Promise<Cliente[]> {
    try {
      return await CustomerRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener clientes: ${error.message}`);
    }
  }

  public static async getCustomerById(customerId: number): Promise<Cliente | null> {
    try {
      return await CustomerRepository.findById(customerId);
    } catch (error: any) {
      throw new Error(`Error al encontrar cliente: ${error.message}`);
    }
  }

  public static async getCustomerByEmail(email: string): Promise<Cliente | null> {
    try {
      return await CustomerRepository.findByEmail(email);
    } catch (error: any) {
      throw new Error(`Error al encontrar cliente: ${error.message}`);
    }
  }
//agregar cliente
  public static async addCustomer(customer: Cliente): Promise<Cliente> {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      customer.created_at = DateUtils.formatDate(new Date());
      customer.updated_at = DateUtils.formatDate(new Date());
      customer.password_cliente = await bcrypt.hash(customer.password_cliente, salt);
      return await CustomerRepository.createCustomer(customer);
    } catch (error: any) {
      throw new Error(`Error al crear cliente: ${error.message}`);
    }
  }

  public static async modifyCustomer(customerId: number, customerData: Cliente): Promise<Cliente | null> {
    try {
      const customerFound = await CustomerRepository.findById(customerId);
      const salt = await bcrypt.genSalt(saltRounds);

      if (customerFound) {
        if (customerData.email) {
          customerFound.email = customerData.email;
        }
        if (customerData.password_cliente) {
          customerFound.password_cliente = await bcrypt.hash(customerData.password_cliente, salt);
        }
        if (customerData.role_id_fk) {
          customerFound.role_id_fk = customerData.role_id_fk;
        }
        if (customerData.deleted) {
          customerFound.deleted = customerData.deleted;
        }
        customerFound.updated_by = customerData.updated_by;
        customerFound.updated_at = DateUtils.formatDate(new Date());
        return await CustomerRepository.updateCustomer(customerId, customerFound);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar cliente: ${error.message}`);
    }
  }

  public static async deleteCustomer(customerId: number): Promise<boolean> {
    try {
      return await CustomerRepository.deleteCustomer(customerId);
    } catch (error: any) {
      throw new Error(`Error al eliminar cliente: ${error.message}`);
    }
  }
}
