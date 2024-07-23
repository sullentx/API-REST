import express, {  Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors'
import morgan from 'morgan';
// Importar rutas de módulos
import customerRoutes from './routes/customerRoutes';
import flowerRoutes from './routes/flowerRoutes';
import favoriteRoutes from './routes/favoriteRoutes'
import imageRouter from './routes/imageRoutes'
import routerBouquet from './routes/BouquetRoutes';
// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors());

// Rutas de los módulos
app.use('/api/upload',imageRouter);
app.use('/api/customer', customerRoutes);
app.use('/api/flowers', flowerRoutes);
app.use(express.json());
app.use('/api', favoriteRoutes);
app.use('/api',routerBouquet );

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

