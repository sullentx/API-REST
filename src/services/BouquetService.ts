import { BouquetRepository } from '../repositories/bouquetRepository';
import { Bouquet } from '../models/bouquet';
import { DateUtils } from '../shared/utils/DateUtils';
import * as dotenv from 'dotenv';

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
      // Actualizar el ramo en la base de datos
      await BouquetRepository.update(bouquetId, bouquetFound);
    } else {
      throw new Error('Bouquet not found');
    }
  }

  public static async deleteBouquet(bouquetId: number): Promise<void> {
    await BouquetRepository.delete(bouquetId);
  }

}
