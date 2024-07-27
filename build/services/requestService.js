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
exports.RequestService = void 0;
const requestRepository_1 = require("../repositories/requestRepository");
const DateUtils_1 = require("../shared/utils/DateUtils");
const bouquetRepository_1 = require("../repositories/bouquetRepository");
class RequestService {
    static getAllRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield requestRepository_1.RequestRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener pedidos: ${error.message}`);
            }
        });
    }
    static getRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield requestRepository_1.RequestRepository.findById(id);
            }
            catch (error) {
                throw new Error(`Error al encontrar pedido: ${error.message}`);
            }
        });
    }
    static createRequest(request, userEmail, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener el precio del ramo
                const bouquet = yield bouquetRepository_1.BouquetRepository.findById(request.bouquet_id);
                if (!bouquet) {
                    throw new Error('Bouquet not found');
                }
                // Configurar el resto de los campos
                request.customer_id = id;
                request.bouquet_id = bouquet.id;
                request.price = bouquet.price;
                request.total = request.quantity * request.price; // Calcular el total
                request.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                request.created_by = userEmail;
                request.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                request.updated_by = userEmail;
                request.deleted = false;
                // Crear el pedido
                return yield requestRepository_1.RequestRepository.create(request);
            }
            catch (error) {
                console.error('Error al crear pedido:', error);
                throw new Error(`Error al crear pedido: ${error.message}`);
            }
        });
    }
    static updateRequest(id, requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestFound = yield requestRepository_1.RequestRepository.findById(id);
                if (requestFound) {
                    requestData.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield requestRepository_1.RequestRepository.update(id, requestData);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar pedido: ${error.message}`);
            }
        });
    }
    static deleteRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield requestRepository_1.RequestRepository.delete(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar pedido: ${error.message}`);
            }
        });
    }
    static updateRequestStatus(id, status_id, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestFound = yield requestRepository_1.RequestRepository.findById(id);
                if (!requestFound) {
                    throw new Error('Pedido no encontrado');
                }
                requestFound.status_id = status_id;
                requestFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                requestFound.updated_by = userEmail;
                return yield requestRepository_1.RequestRepository.update(id, requestFound);
            }
            catch (error) {
                throw new Error(`Error al actualizar estado del pedido: ${error.message}`);
            }
        });
    }
}
exports.RequestService = RequestService;
