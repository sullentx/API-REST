import { BouquetImageRepository } from '../repositories/imageRepositories';
import { BouquetImage } from '../models/image';
import { DateUtils } from '../shared/utils/DateUtils'; 

export class BouquetImageService {
  public static async addImage(bouquetId: number, imageUrl: string, createdBy: string): Promise<BouquetImage> {
    const image: BouquetImage = {
      bouquet_id: bouquetId,
      image_url: imageUrl,
      created_at: DateUtils.formatDate(new Date()),
      updated_at: DateUtils.formatDate(new Date()),
      created_by: createdBy,
      updated_by: createdBy,
    };

    const imageId = await BouquetImageRepository.create(image);
    image.id = imageId;
    return image;
  }

  public static async getImagesByBouquetId(bouquetId: number): Promise<BouquetImage[]> {
    return await BouquetImageRepository.findByBouquetId(bouquetId);
  }
}
