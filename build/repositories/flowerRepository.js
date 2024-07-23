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
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM flower WHERE id = ?', [id], (error, results) => {
                    if (error) {
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
            const query = 'INSERT INTO flower (name, price, color) VALUES (?,?,?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [flower.name, flower.price, flower.color], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdFlowerId = result.insertId;
                        const createdFlower = Object.assign(Object.assign({}, flower), { flower_id: createdFlowerId });
                        resolve(createdFlower);
                    }
                });
            });
        });
    }
    static updateFlower(flower_id, flowerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE flower SET name = ?, price = ?, color = ? WHERE flower_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [flowerData.name, flowerData.price, flowerData.color, flower_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedFlower = Object.assign(Object.assign({}, flowerData), { flower_id: flower_id });
                            resolve(updatedFlower);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteFlower(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM flower WHERE flower_id = ?';
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
exports.FlowerRepository = FlowerRepository;
