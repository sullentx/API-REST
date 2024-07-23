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
exports.FavoriteRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class FavoriteRepository {
    static findByUserId(customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM favorites WHERE customer_id = ?', [customer_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const favorites = results;
                        resolve(favorites);
                    }
                });
            });
        });
    }
    static deleteFavorite(userId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM favorites WHERE customer_id = ? AND id = ?';
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
    static addFavorite(customerId, bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Favorites (customer_id, bouquet_id) VALUES (?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [customerId, bouquetId], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.insertId);
                });
            });
        });
    }
}
exports.FavoriteRepository = FavoriteRepository;
