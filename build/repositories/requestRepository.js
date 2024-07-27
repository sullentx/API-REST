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
exports.RequestRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class RequestRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM request', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const requests = results;
                        resolve(requests);
                    }
                });
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM request WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const requests = results;
                        if (requests.length > 0) {
                            resolve(requests[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO request (customer_id, bouquet_id, quantity, price, total, status_id, delivery_man_id, request_date, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [request.customer_id, request.bouquet_id, request.quantity, request.price, request.total, request.status_id, request.delivery_man_id, request.request_date, request.created_at, request.created_by, request.updated_at, request.updated_by, request.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdRequestId = result.insertId;
                        const createdRequest = Object.assign(Object.assign({}, request), { id: createdRequestId });
                        resolve(createdRequest);
                    }
                });
            });
        });
    }
    static update(id, requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE request SET customer_id = ?, bouquet_id = ?, quantity = ?, price = ?, total = ?, status_id = ?, delivery_man_id = ?, request_date = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [requestData.customer_id, requestData.bouquet_id, requestData.quantity, requestData.price, requestData.total, requestData.status_id, requestData.delivery_man_id, requestData.request_date, requestData.updated_at, requestData.updated_by, requestData.deleted, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedRequest = Object.assign(Object.assign({}, requestData), { id });
                            resolve(updatedRequest);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM request WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [id], (error, result) => {
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
exports.RequestRepository = RequestRepository;
