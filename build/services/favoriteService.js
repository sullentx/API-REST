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
exports.FavoriteService = void 0;
const favoriteRepository_1 = require("../repositories/favoriteRepository");
class FavoriteService {
    static getFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield favoriteRepository_1.FavoriteRepository.findByUserId(userId);
        });
    }
    static deleteFavorite(userId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield favoriteRepository_1.FavoriteRepository.deleteFavorite(userId, favoriteId);
        });
    }
    static addFavorite(customerId, bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteId = yield favoriteRepository_1.FavoriteRepository.addFavorite(customerId, bouquetId);
            return {
                id: favoriteId,
                customer_id: customerId,
                bouquet_id: bouquetId,
            };
        });
    }
}
exports.FavoriteService = FavoriteService;
