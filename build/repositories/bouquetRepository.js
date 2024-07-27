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
exports.BouquetRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class BouquetRepository {
    static create(bouquet) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO Bouquet (name, type_name, details, price, quantity, is_precreated, image_url, flower_quantity, created_at, created_by, updated_at, updated_by, deleted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [
                    bouquet.name,
                    bouquet.type_name,
                    bouquet.details,
                    bouquet.price,
                    bouquet.quantity,
                    bouquet.is_precreated,
                    bouquet.image_url,
                    bouquet.flower_quantity,
                    bouquet.created_at,
                    bouquet.created_by,
                    bouquet.updated_at,
                    bouquet.updated_by,
                    bouquet.deleted
                ], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result.insertId);
                    }
                });
            });
        });
    }
    static findById(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Bouquet WHERE id = ? AND deleted = false';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [bouquetId], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results[0] || null);
                    }
                });
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Bouquet WHERE deleted = false';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                });
            });
        });
    }
    static update(bouquetId, bouquet) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      UPDATE Bouquet
      SET
        name = ?,
        type_name = ?,
        details = ?,
        price = ?,
        quantity = ?,
        is_precreated = ?,
        image_url = ?,
        flower_quantity = ?, // Nuevo atributo
        created_at = ?,
        created_by = ?,
        updated_at = ?,
        updated_by = ?,
        deleted = ?
      WHERE id = ?`;
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [
                    bouquet.name,
                    bouquet.type_name,
                    bouquet.details,
                    bouquet.price,
                    bouquet.quantity,
                    bouquet.is_precreated,
                    bouquet.image_url,
                    bouquet.flower_quantity,
                    bouquet.created_at,
                    bouquet.created_by,
                    bouquet.updated_at,
                    bouquet.updated_by,
                    bouquet.deleted,
                    bouquetId
                ], (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    static delete(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Bouquet SET deleted = true WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [bouquetId], (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    static createCustom(bouquetFlower) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO BouquetFlower (bouquet_id, flower_id, quantity) VALUES (?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [bouquetFlower.bouquet_id, bouquetFlower.flower_id, bouquetFlower.quantity], (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}
exports.BouquetRepository = BouquetRepository;
