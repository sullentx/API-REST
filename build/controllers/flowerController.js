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
        const flower = yield flowerService_1.FlowerService.getFlowerbyId(parseInt(req.params.id, 10));
        if (flower) {
            res.status(200).json(flower);
        }
        else {
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
        const newFlower = req.body;
        yield flowerService_1.FlowerService.createFlower(newFlower);
        res.status(201).send('Flower creado');
    }
    catch (err) {
        res.status(500).send('Error al crear el flower');
    }
});
exports.createFlower = createFlower;
const updateFlower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedFlower = req.body;
        yield flowerService_1.FlowerService.updateFlower(parseInt(req.params.id, 10), updatedFlower);
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
