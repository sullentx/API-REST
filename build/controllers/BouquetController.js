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
exports.createCustomBouquet = exports.deleteBouquet = exports.updateBouquet = exports.getAllBouquets = exports.getBouquetById = exports.createBouquet = void 0;
const BouquetService_1 = require("../services/BouquetService");
const createBouquet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    console.log(req.body);
    console.log(req.personData);
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        if (!req.personData) {
            return res.status(401).send('User data not available.');
        }
        const newProduct = yield BouquetService_1.BouquetService.addBouquet(req.body, req.file, req.personData.email);
        if (newProduct) {
            res.status(201).json(newProduct);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        console.log(error);
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
        if (!req.personData) {
            return res.status(401).send('User data not available.');
        }
        if (!req.file) {
            return res.status(401).send('File not available.');
        }
        yield BouquetService_1.BouquetService.modifyBouquet(parseInt(req.params.id, 10), req.body, req.file, req.personData.email);
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
const createCustomBouquet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.personData);
    console.log(req.body);
    try {
        if (!req.personData) {
            return res.status(401).send('User data not available.');
        }
        const { name, type_name, details, flower_quantity, is_precreated, image_url, flowers } = req.body;
        const newBouquet = {
            id: 0,
            name: name,
            type_name: type_name,
            details: details,
            price: 0,
            quantity: flower_quantity,
            flower_quantity: flowers,
            is_precreated: is_precreated,
            image_url: image_url,
            created_at: '',
            created_by: '',
            updated_at: '',
            updated_by: '',
            deleted: false
        };
        console.log(newBouquet);
        const createdBouquet = yield BouquetService_1.BouquetService.createCustomBouquet(newBouquet, flowers, req.personData.email);
        if (createdBouquet) {
            res.status(201).json(createdBouquet);
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCustomBouquet = createCustomBouquet;
