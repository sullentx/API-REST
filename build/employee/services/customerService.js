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
exports.CustomerService = void 0;
const customerRepository_1 = require("../repositories/customerRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class CustomerService {
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield this.getCustomerByEmail(email);
                if (!customer) {
                    return null;
                }
                console.log('Password received:', password);
                console.log('Customer password:', customer.password_cliente);
                const passwordMatch = yield bcrypt_1.default.compare(password, customer.password_cliente);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    customer_id: customer.customer_id,
                    role_id_fk: customer.role_id_fk,
                    email: customer.email
                };
                return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1500m' });
            }
            catch (error) {
                throw new Error(`Error al logearse: ${error.message}`);
            }
        });
    }
    static getAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustomerRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener clientes: ${error.message}`);
            }
        });
    }
    static getCustomerById(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustomerRepository.findById(customerId);
            }
            catch (error) {
                throw new Error(`Error al encontrar cliente: ${error.message}`);
            }
        });
    }
    static getCustomerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustomerRepository.findByEmail(email);
            }
            catch (error) {
                throw new Error(`Error al encontrar cliente: ${error.message}`);
            }
        });
    }
    //agregar cliente
    static addCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                customer.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                customer.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                customer.password_cliente = yield bcrypt_1.default.hash(customer.password_cliente, salt);
                return yield customerRepository_1.CustomerRepository.createCustomer(customer);
            }
            catch (error) {
                throw new Error(`Error al crear cliente: ${error.message}`);
            }
        });
    }
    static modifyCustomer(customerId, customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerFound = yield customerRepository_1.CustomerRepository.findById(customerId);
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                if (customerFound) {
                    if (customerData.email) {
                        customerFound.email = customerData.email;
                    }
                    if (customerData.password_cliente) {
                        customerFound.password_cliente = yield bcrypt_1.default.hash(customerData.password_cliente, salt);
                    }
                    if (customerData.role_id_fk) {
                        customerFound.role_id_fk = customerData.role_id_fk;
                    }
                    if (customerData.deleted) {
                        customerFound.deleted = customerData.deleted;
                    }
                    customerFound.updated_by = customerData.updated_by;
                    customerFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield customerRepository_1.CustomerRepository.updateCustomer(customerId, customerFound);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
    static deleteCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustomerRepository.deleteCustomer(customerId);
            }
            catch (error) {
                throw new Error(`Error al eliminar cliente: ${error.message}`);
            }
        });
    }
}
exports.CustomerService = CustomerService;
