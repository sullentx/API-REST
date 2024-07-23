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
exports.ordersRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class ordersRepository {
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT o.id, o.order_date, o.total, s.status_name FROM `Order` o JOIN status s ON o.delivery_status = s.id WHERE o.customer_id = ? AND o.deleted = false;', [userId], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const orders = results;
                        resolve(orders);
                    }
                });
            });
        });
    }
    static updateOrder(userId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'PUT FROM orders WHERE customer_id = ? AND stattus_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [userId, favoriteId], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result.affectedRows > 0);
                    }
                });
            });
        });
    }
}
exports.ordersRepository = ordersRepository;
