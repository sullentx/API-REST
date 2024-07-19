"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getCustomers = exports.loginCustomer = void 0;
const customerService_1 = require("../services/customerService");
const loginCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password_cliente } = req.body;
    try {
        const token = yield customerService_1.CustomerService.login(email, password_cliente);
        if (!token) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        else {
            res.status(200).json({ token });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginCustomer = loginCustomer;
const getCustomers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customerService_1.CustomerService.getAllCustomers();
        if (customers) {
            res.status(200).json(customers);
        }
        else {
            res.status(404).json({ message: 'No records found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCustomers = getCustomers;
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customerService_1.CustomerService.getCustomerById(parseInt(req.params.customer_id, 10));
        if (customer) {
            res.status(200).json(customer);
        }
        else {
            res.status(404).json({ message: 'Customer not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCustomerById = getCustomerById;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCustomer = yield customerService_1.CustomerService.addCustomer(req.body);
        if (newCustomer) {
            res.status(201).json(newCustomer);
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCustomer = createCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCustomer = yield customerService_1.CustomerService.modifyCustomer(parseInt(req.params.customer_id, 10), req.body);
        if (updatedCustomer) {
            res.status(200).json(updatedCustomer);
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield customerService_1.CustomerService.deleteCustomer(parseInt(req.params.customer_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Customer deleted.' });
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCustomer = deleteCustomer;
