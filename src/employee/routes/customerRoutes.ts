import { Router } from 'express';
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer, loginCustomer } from '../controllers/customerController';

const customerRoutes: Router = Router();

customerRoutes.post('/login', loginCustomer);

customerRoutes.get('/', getCustomers);
customerRoutes.get('/:customer_id', getCustomerById);
customerRoutes.post('/', createCustomer);
customerRoutes.put('/:customer_id', updateCustomer);
customerRoutes.delete('/:customer_id', deleteCustomer);

export default customerRoutes;
