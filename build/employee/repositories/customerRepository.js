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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class CustomerRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT customer_id, role_id_fk, email FROM cliente', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const clientes = results;
                        resolve(clientes);
                    }
                });
            });
        });
    }
    static findById(customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM cliente WHERE customer_id = ?', [customer_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const clientes = results;
                        if (clientes.length > 0) {
                            resolve(clientes[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM cliente WHERE email = ?', [email], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const clientes = results;
                        if (clientes.length > 0) {
                            resolve(clientes[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createCustomer(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO cliente (email, role_id_fk, password_cliente) VALUES (?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [cliente.email, cliente.role_id_fk, cliente.password_cliente], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdCustomerId = result.insertId;
                        const createdCustomer = Object.assign(Object.assign({}, cliente), { customer_id: createdCustomerId });
                        resolve(createdCustomer);
                    }
                });
            });
        });
    }
    static updateCustomer(customer_id, customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE cliente SET email = ?, password_cliente = ?, role_id_fk = ? WHERE customer_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [customerData.email, customerData.password_cliente, customerData.role_id_fk, customer_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedCustomer = Object.assign(Object.assign({}, customerData), { customer_id: customer_id });
                            resolve(updatedCustomer);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteCustomer(customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM cliente WHERE customer_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [customer_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.CustomerRepository = CustomerRepository;
