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
exports.BouquetService = void 0;
const bouquetRepository_1 = require("../repositories/bouquetRepository");
const DateUtils_1 = require("../shared/utils/DateUtils");
const dotenv = __importStar(require("dotenv"));
const flowerRepository_1 = require("../repositories/flowerRepository");
dotenv.config();
class BouquetService {
    static addBouquet(bouquet, file, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlProject = process.env.URL;
            const portProject = process.env.PORT;
            try {
                bouquet.id = bouquet.id;
                bouquet.name = bouquet.name;
                bouquet.type_name = bouquet.type_name;
                bouquet.details = bouquet.details;
                bouquet.price = bouquet.price;
                bouquet.quantity = bouquet.quantity;
                bouquet.is_precreated = bouquet.is_precreated;
                bouquet.image_url = `${urlProject}:${portProject}/uploads/${file.filename}`;
                bouquet.flower_quantity = bouquet.flower_quantity;
                bouquet.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                bouquet.created_by = userEmail;
                bouquet.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                bouquet.updated_by = userEmail;
                bouquet.deleted = false;
                const bouquetId = yield bouquetRepository_1.BouquetRepository.create(bouquet);
                bouquet.id = bouquetId;
                console.log(bouquet);
                return bouquet;
            }
            catch (error) {
                throw new Error(`Error al crear producto: ${error.message}`);
            }
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
    static modifyBouquet(bouquetId, bouquet, file, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const bouquetFound = yield bouquetRepository_1.BouquetRepository.findById(bouquetId);
            if (bouquetFound) {
                bouquetFound.name = bouquet.name;
                bouquetFound.type_name = bouquet.type_name;
                bouquetFound.details = bouquet.details;
                bouquetFound.quantity = bouquet.quantity;
                bouquetFound.is_precreated = bouquet.is_precreated;
                bouquetFound.created_at = bouquetFound.created_at;
                bouquetFound.created_by = bouquetFound.created_by;
                bouquetFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                bouquetFound.updated_by = userEmail;
                bouquetFound.deleted = bouquetFound.deleted;
                // Si se proporciona un archivo, actualizar la URL de la imagen
                if (file) {
                    const urlProject = process.env.URL;
                    const portProject = process.env.PORT;
                    bouquetFound.image_url = `${urlProject}:${portProject}/uploads/${file.filename}`;
                }
                bouquetFound.flower_quantity = bouquet.flower_quantity;
                // Actualizar el ramo en la base de datos
                yield bouquetRepository_1.BouquetRepository.update(bouquetId, bouquetFound);
            }
            else {
                throw new Error('Bouquet not found');
            }
        });
    }
    static deleteBouquet(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield bouquetRepository_1.BouquetRepository.delete(bouquetId);
        });
    }
    static createCustomBouquet(bouquetData, flowers, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar stock de flores
                for (const flower of flowers) {
                    const flowerData = yield flowerRepository_1.FlowerRepository.findById(flower.flower_id);
                    if (!flowerData || flowerData.quantity < flower.quantity) {
                        throw new Error(`Insufficient stock for flower ID: ${flower.flower_id}`);
                    }
                }
                // Calcular el precio total del ramo
                let totalPrice = 0;
                for (const flower of flowers) {
                    const flowerData = yield flowerRepository_1.FlowerRepository.findById(flower.flower_id);
                    if (flowerData) {
                        totalPrice += flowerData.price * flower.quantity;
                    }
                }
                // Asignar una imagen por defecto si no se proporciona una
                const defaultImageUrl = '../../uploads/customBouquet.png'; // Cambia esto a la ruta real de tu imagen por defecto
                if (!bouquetData.image_url) {
                    bouquetData.image_url = defaultImageUrl;
                }
                // Crear el ramo personalizado
                const bouquet = Object.assign(Object.assign({}, bouquetData), { name: 'custom', type_name: 'custom', details: 'custom', is_precreated: false, price: totalPrice, created_at: DateUtils_1.DateUtils.formatDate(new Date()), created_by: userEmail, updated_at: DateUtils_1.DateUtils.formatDate(new Date()), updated_by: userEmail, deleted: false });
                const bouquetId = yield bouquetRepository_1.BouquetRepository.create(bouquet);
                bouquet.id = bouquetId;
                // Insertar en BouquetFlower y actualizar stock de flores
                for (const flower of flowers) {
                    yield bouquetRepository_1.BouquetRepository.createCustom({
                        bouquet_id: bouquetId,
                        flower_id: flower.flower_id,
                        quantity: flower.quantity,
                    });
                    // Actualizar stock de flores
                    const flowerData = yield flowerRepository_1.FlowerRepository.findById(flower.flower_id);
                    if (flowerData) {
                        flowerData.quantity -= flower.quantity;
                        yield flowerRepository_1.FlowerRepository.updateFlower(flowerData.id, flowerData);
                    }
                }
                return bouquet;
            }
            catch (error) {
                console.error('Error al crear ramo personalizado:', error);
                throw new Error(`Error al crear ramo personalizado: ${error.message}`);
            }
        });
    }
}
exports.BouquetService = BouquetService;
