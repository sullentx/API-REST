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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BouquetService = void 0;
const bouquetRepository_1 = require("../repositories/bouquetRepository");
const DateUtils_1 = require("../shared/utils/DateUtils");
class BouquetService {
    static addBouquet(bouquet) {
        return __awaiter(this, void 0, void 0, function* () {
            bouquet.created_at = DateUtils_1.DateUtils.formatDate(new Date());
            bouquet.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
            bouquet.created_by = bouquet.created_by || 'Administrador';
            bouquet.updated_by = bouquet.updated_by || 'Administrador';
            const bouquetId = yield bouquetRepository_1.BouquetRepository.create(bouquet);
            bouquet.id = bouquetId;
            return bouquet;
        });
    }
    static getBouquetById(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bouquetRepository_1.BouquetRepository.findById(bouquetId);
        });
    }
    static getAllBouquets() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bouquetRepository_1.BouquetRepository.findAll();
        });
    }
    static modifyBouquet(bouquetId, bouquet) {
        return __awaiter(this, void 0, void 0, function* () {
            bouquet.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
            yield bouquetRepository_1.BouquetRepository.update(bouquetId, bouquet);
        });
    }
    static deleteBouquet(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield bouquetRepository_1.BouquetRepository.delete(bouquetId);
        });
    }
    static getBouquetByIdWithImages(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bouquetRepository_1.BouquetRepository.findByIdWithImages(bouquetId);
        });
    }
}
exports.BouquetService = BouquetService;
