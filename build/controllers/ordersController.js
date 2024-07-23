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
exports.updateOrderStatus = exports.getOrders = void 0;
const favoriteService_1 = require("../services/favoriteService");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.personData) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const favorites = yield favoriteService_1.FavoriteService.getFavorites(req.personData.id);
        res.status(200).json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrders = getOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.personData) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const result = yield favoriteService_1.FavoriteService.deleteFavorite(req.personData.id, parseInt(req.params.id, 10));
        if (result) {
            res.status(200).json({ message: 'Favorite deleted' });
        }
        else {
            res.status(404).json({ message: 'Favorite not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateOrderStatus = updateOrderStatus;
