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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesByBouquetId = exports.createBouquetImage = exports.uploadBouquetImage = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const imageService_1 = require("../services/imageService");
// Configuración de multer 
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path_1.default.join(__dirname, '../uploads')); // Directorio donde se almacenarán las imágenes
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.uploadBouquetImage = upload.single('image');
const createBouquetImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { bouquetId } = req.body;
        const imageUrl = req.file ? path_1.default.join('uploads', req.file.filename) : '';
        console.log(imageUrl);
        if (!imageUrl) {
            return res.status(400).send('Add image please');
        }
        if (!bouquetId) {
            return res.status(400).send('Bouquet ID is required');
        }
        const createdBy = ((_a = req.personData) === null || _a === void 0 ? void 0 : _a.email) || 'system';
        const image = yield imageService_1.BouquetImageService.addImage(parseInt(bouquetId, 10), imageUrl, createdBy);
        res.status(201).json({ message: 'Image uploaded successfully', image });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createBouquetImage = createBouquetImage;
const getImagesByBouquetId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield imageService_1.BouquetImageService.getImagesByBouquetId(parseInt(req.params.id, 10));
        res.status(200).json(images);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getImagesByBouquetId = getImagesByBouquetId;
