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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
// Importar rutas de módulos
const customerRoutes_1 = __importDefault(require("./employee/routes/customerRoutes"));
const flowerRoutes_1 = __importDefault(require("./product/routes/flowerRoutes"));
// Importar middlewares compartidos
const errorHandler_1 = require("./shared/middlewares/errorHandler");
const notFoundHandler_1 = require("./shared/middlewares/notFoundHandler");
// Configuración de variables de entorno
dotenv.config();
// Crear la aplicación de Express
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10);
// Middleware de análisis del cuerpo
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Rutas de los módulos
app.use('/api/customer', customerRoutes_1.default);
app.use('/api/flowers', flowerRoutes_1.default);
// Middleware para manejar rutas no encontradas
app.use(notFoundHandler_1.notFoundHandler);
// Middleware de manejo de errores
app.use(errorHandler_1.errorHandler);
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});