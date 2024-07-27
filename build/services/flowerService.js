"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const flowerRepository_1 = require("../repositories/flowerRepository");
const DateUtils_1 = require("../shared/utils/DateUtils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class FlowerService {
    static getFlowers() {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.findAll();
        });
    }
    static getFlowerby(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return flowerRepository_1.FlowerRepository.findByName(name);
        });
    }
    static createFlower(flower, file, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlProject = process.env.URL;
            const portProject = process.env.PORT;
            try {
                flower.id = flower.id;
                flower.name = flower.name;
                flower.color = flower.color;
                flower.price = flower.price;
                flower.quantity = flower.quantity;
                flower.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                flower.created_by = userEmail;
                flower.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                flower.updated_by = userEmail;
                flower.deleted = false;
                flower.image_url = `${urlProject}:${portProject}/uploadsFlower/${file.filename}`;
                console.log(flower);
                const flowerId = yield flowerRepository_1.FlowerRepository.createFlower(flower);
                flower.id = flowerId;
                return flower;
            }
            catch (error) {
                throw new Error(`Error al crear producto: ${error.message}`);
            }
        });
    }
    static updateFlower(flowerId, updatedItem, file, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const flowerFound = yield flowerRepository_1.FlowerRepository.findById(flowerId);
            if (flowerFound) {
                flowerFound.name = updatedItem.name;
                flowerFound.price = updatedItem.price;
                flowerFound.color = updatedItem.color;
                flowerFound.quantity = updatedItem.quantity;
                flowerFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                flowerFound.updated_by = userEmail;
                flowerFound.deleted = false;
                console.log(updatedItem.deleted);
                if (file) {
                    const urlProject = process.env.URL;
                    const portProject = process.env.PORT;
                    flowerFound.image_url = `${urlProject}:${portProject}/uploads/${file.filename}`;
                }
                /*
                 bouquetFound.name = bouquet.name;
                    bouquetFound.type_name = bouquet.type_name;
                    bouquetFound.details = bouquet.details;
                    bouquetFound.quantity = bouquet.quantity;
                    bouquetFound.is_precreated = bouquet.is_precreated;
                    bouquetFound.created_at = bouquetFound.created_at;
                    bouquetFound.created_by = bouquetFound.created_by;
                    bouquetFound.updated_at = DateUtils.formatDate(new Date());
                    bouquetFound.updated_by = userEmail;
                    bouquetFound.deleted = bouquetFound.deleted; */
                // Actualizar la flor en la base de datos
                yield flowerRepository_1.FlowerRepository.updateFlower(flowerId, flowerFound);
            }
            else {
                throw new Error('Flower not found');
            }
        });
    }
    static deleteFlower(flowerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flowerFound = yield flowerRepository_1.FlowerRepository.findById(flowerId);
                if (flowerFound) {
                    yield flowerRepository_1.FlowerRepository.deleteFlower(flowerId);
                }
                else {
                    throw new Error('Flower not found');
                }
            }
            catch (error) {
                throw new Error(`Error al eliminar la flor: ${error.message}`);
            }
        });
    }
}
exports.FlowerService = FlowerService;
