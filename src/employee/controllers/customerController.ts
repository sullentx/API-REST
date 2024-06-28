import { Request, Response } from 'express';
import { CustomerService } from '../services/customerService';

export const loginCustomer = async (req: Request, res: Response) => {
  const { email, password_cliente } = req.body;
  try {
    const token = await CustomerService.login(email, password_cliente);

    if (!token) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await CustomerService.getAllCustomers();
    if (customers) {
      res.status(200).json(customers);
    } else {
      res.status(404).json({ message: 'No records found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await CustomerService.getCustomerById(parseInt(req.params.customer_id, 10));
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = await CustomerService.addCustomer(req.body);
    if (newCustomer) {
      res.status(201).json(newCustomer);
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const updatedCustomer = await CustomerService.modifyCustomer(parseInt(req.params.customer_id, 10), req.body);
    if (updatedCustomer) {
      res.status(200).json(updatedCustomer);
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const deleted = await CustomerService.deleteCustomer(parseInt(req.params.customer_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Customer deleted.' });
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
