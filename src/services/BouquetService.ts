import { BouquetRepository } from '../repositories/bouquetRepository';
import { Bouquet } from '../models/bouquet';
import { DateUtils } from '../shared/utils/DateUtils';
import * as dotenv from 'dotenv';
import { FlowerRepository } from '../repositories/flowerRepository';
dotenv.config();


export class BouquetService {

  public static async addBouquet(bouquet: Bouquet, file: Express.Multer.File, userEmail: string) {
    const urlProject = process.env.URL;
    const portProject = process.env.PORT;
    try {
      bouquet.id = bouquet.id
      bouquet.name = bouquet.name;
      bouquet.type_name = bouquet.type_name;
      bouquet.details = bouquet.details;
      bouquet.price = bouquet.price;
      bouquet.quantity = bouquet.quantity;
      bouquet.is_precreated = bouquet.is_precreated;
      bouquet.image_url = `${urlProject}:${portProject}/uploads/${file.filename}`;
      bouquet.flower_quantity = bouquet.flower_quantity;
      bouquet.created_at = DateUtils.formatDate(new Date());
      bouquet.created_by = userEmail;
      bouquet.updated_at = DateUtils.formatDate(new Date());
      bouquet.updated_by = userEmail;
      bouquet.deleted = false;
      
      const bouquetId = await BouquetRepository.create(bouquet);
      bouquet.id = bouquetId;
      console.log(bouquet)
      return bouquet;
    } catch (error: any) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }


  public static async getBouquetById(bouquetId: number): Promise<Bouquet | null> {
    return await BouquetRepository.findById(bouquetId);
  }

  public static async getAllBouquets(): Promise<Bouquet[]> {
    return await BouquetRepository.findAll();
  }

  public static async modifyBouquet(bouquetId: number, bouquet: Bouquet, file: Express.Multer.File, userEmail: string) {
    const bouquetFound = await BouquetRepository.findById(bouquetId);
    if (bouquetFound) {
      bouquetFound.name = bouquet.name;
      bouquetFound.type_name = bouquet.type_name;
      bouquetFound.details = bouquet.details;
      bouquetFound.quantity = bouquet.quantity;
      bouquetFound.is_precreated = bouquet.is_precreated;
      bouquetFound.created_at = bouquetFound.created_at;
      bouquetFound.created_by = bouquetFound.created_by;
      bouquetFound.updated_at = DateUtils.formatDate(new Date());
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
      await BouquetRepository.update(bouquetId, bouquetFound);
    } else {
      throw new Error('Bouquet not found');
    }
  }

  public static async deleteBouquet(bouquetId: number): Promise<void> {
    await BouquetRepository.delete(bouquetId);
  }

  public static async createCustomBouquet(bouquetData: Bouquet, flowers: { flower_id: number, quantity: number }[], userEmail: string): Promise<Bouquet> {
    try {
      // Verificar stock de flores
      for (const flower of flowers) {
        const flowerData = await FlowerRepository.findById(flower.flower_id);
        if (!flowerData || flowerData.quantity < flower.quantity) {
          throw new Error(`Insufficient stock for flower ID: ${flower.flower_id}`);
        }
      }

      // Calcular el precio total del ramo
      let totalPrice = 0;
      for (const flower of flowers) {
        const flowerData = await FlowerRepository.findById(flower.flower_id);
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
      const bouquet: Bouquet = {
        ...bouquetData,
        name: 'custom',
        type_name: 'custom',
        details: 'custom',
        is_precreated: false,
        price: totalPrice,
        created_at: DateUtils.formatDate(new Date()),
        created_by: userEmail,
        updated_at: DateUtils.formatDate(new Date()),
        updated_by: userEmail,
        deleted: false,
      };
      const bouquetId = await BouquetRepository.create(bouquet);
      bouquet.id = bouquetId;

      // Insertar en BouquetFlower y actualizar stock de flores
      for (const flower of flowers) {
        await BouquetRepository.createCustom({
          bouquet_id: bouquetId,
          flower_id: flower.flower_id,
          quantity: flower.quantity,
        });

        // Actualizar stock de flores
        const flowerData = await FlowerRepository.findById(flower.flower_id);
        if (flowerData) {
          flowerData.quantity -= flower.quantity;
          await FlowerRepository.updateFlower(flowerData.id, flowerData);
        }
      }

      return bouquet;
    } catch (error: any) {
      console.error('Error al crear ramo personalizado:', error);
      throw new Error(`Error al crear ramo personalizado: ${error.message}`);
    }
  }

}
