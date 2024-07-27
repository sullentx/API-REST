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
exports.FlowerRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class FlowerRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM flower', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const flowers = results;
                        resolve(flowers);
                    }
                });
            });
        });
    }
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM flower WHERE name LIKE ?', [`%${name}%`], (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        const flowers = results;
                        if (flowers.length > 0) {
                            resolve(flowers[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findById(flowerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM flower WHERE id = ?', [flowerId], (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        const flowers = results;
                        if (flowers.length > 0) {
                            resolve(flowers[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createFlower(flower) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO flower (name, price, color, quantity, created_at, created_by, updated_at, updated_by, deleted, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [
                    flower.name,
                    flower.price,
                    flower.color,
                    flower.quantity,
                    flower.created_at,
                    flower.created_by,
                    flower.updated_at,
                    flower.updated_by,
                    flower.deleted,
                    flower.image_url
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
    static updateFlower(flowerId, updatedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ID:', flowerId);
            console.log('Updated Item:', updatedItem);
            const query = 'UPDATE flower SET name = ?, price = ?, color = ?, quantity = ?, updated_at = ?, updated_by = ?, deleted = ?, image_url = ? WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [
                    updatedItem.name,
                    updatedItem.price,
                    updatedItem.color,
                    updatedItem.quantity,
                    updatedItem.updated_at,
                    updatedItem.updated_by,
                    updatedItem.deleted,
                    updatedItem.image_url,
                    flowerId
                ], (error, result) => {
                    if (error) {
                        console.log('Error:', error);
                        reject(error);
                    }
                    else {
                        if (result.affectedRows === 0) {
                            resolve(null);
                        }
                        else {
                            const updatedFlower = Object.assign(Object.assign({}, updatedItem), { id: flowerId });
                            resolve(updatedFlower);
                        }
                    }
                });
            });
        });
    }
    static deleteFlower(flowerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM flower WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [flowerId], (error, result) => {
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
exports.FlowerRepository = FlowerRepository;
