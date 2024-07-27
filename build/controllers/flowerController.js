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
exports.deleteFlower = exports.updateFlower = exports.createFlower = exports.getFlowerById = exports.getFlowers = void 0;
const flowerService_1 = require("../services/flowerService");
const getFlowers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(res);
    try {
        const flowers = yield flowerService_1.FlowerService.getFlowers();
        res.json(flowers);
    }
    catch (err) {
        res.status(500).send('Error al obtener los datos');
    }
});
exports.getFlowers = getFlowers;
const getFlowerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flower = yield flowerService_1.FlowerService.getFlowerby((req.params.name));
        if (flower) {
            res.status(200).json(flower);
        }
        else {
            console.log(flower);
            res.status(404).json({ message: 'Flower not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getFlowerById = getFlowerById;
const createFlower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.personData);
        console.log('Received request body:', req.body);
        console.log('Received file:', req.file);
        if (!req.file) {
            console.log(req.file);
            return res.status(400).send('no file uploaded.');
        }
        if (!req.personData) {
            console.log(req.personData);
            return res.status(400).send('No data provied');
        }
        console.log('Received request body:', req.body);
        console.log('Received file:', req.file);
        console.log('Person data:', req.personData);
        const newFlower = yield flowerService_1.FlowerService.createFlower(req.body, req.file, req.personData.email);
        console.log(newFlower);
        if (newFlower) {
            res.status(201).json(newFlower);
        }
        else {
            console.log(newFlower);
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error al crear la flor');
    }
});
exports.createFlower = createFlower;
const updateFlower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flowerId = parseInt(req.params.id, 10);
        if (!req.file) {
            return res.status(400).send('no file provied');
        }
        if (!req.personData) {
            return res.status(400).send('no data provied');
        }
        if (isNaN(flowerId)) {
            res.status(400).send('Invalid ID');
            return;
        }
        const updatedFlower = req.body;
        const file = req.file;
        yield flowerService_1.FlowerService.updateFlower(flowerId, updatedFlower, file, req.personData.email);
        res.send('Flower actualizado');
    }
    catch (err) {
        res.status(500).send('Error al actualizar el flower');
    }
});
exports.updateFlower = updateFlower;
const deleteFlower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield flowerService_1.FlowerService.deleteFlower(parseInt(req.params.id, 10));
        res.send('Flower eliminado');
    }
    catch (err) {
        res.status(500).send('Error al eliminar el flower');
    }
});
exports.deleteFlower = deleteFlower;
