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
exports.BouquetImageRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class BouquetImageRepository {
    static create(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO BouquetImages (bouquet_id, image_url, created_by) VALUES (?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [image.bouquet_id, image.image_url, image.created_by], (error, result) => {
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
    static findByBouquetId(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM BouquetImages WHERE bouquet_id = ? AND deleted = false';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [bouquetId], (error, results) => {
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
}
exports.BouquetImageRepository = BouquetImageRepository;
