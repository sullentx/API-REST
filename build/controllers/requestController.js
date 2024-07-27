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
exports.updateRequestStatus = exports.deleteRequest = exports.updateRequest = exports.createRequest = exports.getRequestById = exports.getRequests = void 0;
const requestService_1 = require("../services/requestService");
const getRequests = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield requestService_1.RequestService.getAllRequests();
        res.status(200).json(requests);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRequests = getRequests;
const getRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield requestService_1.RequestService.getRequestById(parseInt(req.params.id, 10));
        if (request) {
            res.status(200).json(request);
        }
        else {
            res.status(404).json({ message: 'Request not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRequestById = getRequestById;
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        if (!req.personData) {
            return res.status(401).send('User data not available.');
        }
        const newRequest = yield requestService_1.RequestService.createRequest(req.body, req.personData.email, req.personData.id);
        res.status(201).json(newRequest);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createRequest = createRequest;
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRequest = yield requestService_1.RequestService.updateRequest(parseInt(req.params.id, 10), req.body);
        if (updatedRequest) {
            res.status(200).json(updatedRequest);
        }
        else {
            res.status(404).json({ message: 'Request not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateRequest = updateRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield requestService_1.RequestService.deleteRequest(parseInt(req.params.id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Request deleted' });
        }
        else {
            res.status(404).json({ message: 'Request not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteRequest = deleteRequest;
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = parseInt(req.params.id, 10);
        const { status_id } = req.body;
        if (!req.personData) {
            return res.status(404).json({ message: 'person data not found' });
        }
        const updatedRequest = yield requestService_1.RequestService.updateRequestStatus(requestId, status_id, req.personData.email);
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json(updatedRequest);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateRequestStatus = updateRequestStatus;
