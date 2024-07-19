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
exports.FlowerService = void 0;
const flowerRepository_1 = require("../reporsitories/flowerRepository");
class FlowerService {
    static getFlowers() {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.findAll();
        });
    }
    static getFlowerbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.findById(id);
        });
    }
    static createFlower(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.createFlower(newItem);
        });
    }
    static updateFlower(id, updatedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.updateFlower(id, updatedItem);
        });
    }
    static deleteFlower(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.deleteFlower(id);
        });
    }
}
exports.FlowerService = FlowerService;
