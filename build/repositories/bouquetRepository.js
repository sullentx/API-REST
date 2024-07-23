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
            const query = 'INSERT INTO Bouquet (name, is_precreated, created_by) VALUES (?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [bouquet.name, bouquet.is_precreated, bouquet.created_by], (error, result) => {
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
            const query = 'UPDATE Bouquet SET name = ?, is_precreated = ?, updated_by = ? WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [bouquet.name, bouquet.is_precreated, bouquet.updated_by, bouquetId], (error) => {
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
    static findAllWithImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT b.id, b.name, b.is_precreated, bi.id AS image_id, bi.image_url
      FROM Bouquet b
      LEFT JOIN BouquetImage bi ON b.id = bi.bouquet_id
      WHERE b.deleted = false
      ORDER BY b.id;
    `;
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const bouquets = [];
                        let currentBouquet;
                        results.forEach((row) => {
                            if (!currentBouquet || currentBouquet.id !== row.id) {
                                if (currentBouquet) {
                                    bouquets.push(currentBouquet);
                                }
                                currentBouquet = {
                                    id: row.id,
                                    name: row.name,
                                    is_precreated: row.is_precreated,
                                    image: [],
                                };
                            }
                            if (row.image_id) {
                                currentBouquet.image.push({
                                    id: row.image_id,
                                    image_url: row.image_url,
                                });
                            }
                        });
                        if (currentBouquet) {
                            bouquets.push(currentBouquet);
                        }
                        resolve(bouquets);
                    }
                });
            });
        });
    }
    static findByIdWithImages(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bouquetQuery = 'SELECT * FROM Bouquet WHERE id = ? AND deleted = false';
            const imagesQuery = 'SELECT * FROM BouquetImages WHERE bouquet_id = ? AND deleted = false';
            return new Promise((resolve, reject) => {
                database_1.default.query(bouquetQuery, [bouquetId], (error, bouquetResults) => {
                    if (error) {
                        reject(error);
                    }
                    else if (bouquetResults.length === 0) {
                        reject(new Error('Bouquet not found'));
                    }
                    else {
                        const bouquet = bouquetResults[0];
                        database_1.default.query(imagesQuery, [bouquetId], (imageError, imageResults) => {
                            if (imageError) {
                                reject(imageError);
                            }
                            else {
                                const images = imageResults;
                                resolve({ bouquet, images });
                            }
                        });
                    }
                });
            });
        });
    }
}
exports.BouquetRepository = BouquetRepository;
