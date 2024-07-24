import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
// Importar rutas de módulos
import customerRoutes from './routes/customerRoutes';
import flowerRoutes from './routes/flowerRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import routerBouquet from './routes/bouquetRoutes';
// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Verificar variables de entorno
console.log('URL:', process.env.URL);
console.log('PORT:', port);

// Middleware de análisis del cuerpo
app.use(express.json()); // Usar solo express.json()
app.use(morgan('dev'));
app.use(cors());

// Rutas de los módulos
app.use('/api/customer', customerRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', routerBouquet);

// Middleware para subir imágenes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
