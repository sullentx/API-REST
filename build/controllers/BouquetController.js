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
exports.getBouquetByIdWithImages = exports.deleteBouquet = exports.updateBouquet = exports.getAllBouquets = exports.getBouquetById = exports.createBouquet = void 0;
const BouquetService_1 = require("../services/BouquetService");
const createBouquet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBouquet = yield BouquetService_1.BouquetService.addBouquet(req.body);
        res.status(201).json(newBouquet);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createBouquet = createBouquet;
const getBouquetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bouquet = yield BouquetService_1.BouquetService.getBouquetById(parseInt(req.params.id, 10));
        if (bouquet) {
            res.status(200).json(bouquet);
        }
        else {
            res.status(404).json({ message: 'Bouquet not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getBouquetById = getBouquetById;
const getAllBouquets = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bouquets = yield BouquetService_1.BouquetService.getAllBouquets();
        res.status(200).json(bouquets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllBouquets = getAllBouquets;
const updateBouquet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BouquetService_1.BouquetService.modifyBouquet(parseInt(req.params.id, 10), req.body);
        res.status(200).json({ message: 'Bouquet updated' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateBouquet = updateBouquet;
const deleteBouquet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BouquetService_1.BouquetService.deleteBouquet(parseInt(req.params.id, 10));
        res.status(200).json({ message: 'Bouquet deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteBouquet = deleteBouquet;
const getBouquetByIdWithImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bouquetWithImages = yield BouquetService_1.BouquetService.getBouquetByIdWithImages(parseInt(req.params.id, 10));
        res.status(200).json(bouquetWithImages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getBouquetByIdWithImages = getBouquetByIdWithImages;
