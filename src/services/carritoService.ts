import { CarritoRepository } from '../repositories/carritoRepository';
import { Carrito, CarritoItem } from '../models/carritoItems';
import { DateUtils } from '../shared/utils/DateUtils';

export class CarritoService {
  public static async createCarrito(carrito: Carrito): Promise<Carrito> {
    carrito.created_at = DateUtils.formatDate(new Date());
    carrito.updated_at = DateUtils.formatDate(new Date());
    const carritoId = await CarritoRepository.create(carrito);
    carrito.id = carritoId;
    return carrito;
  }

  public static async getCarritoById(carritoId: number): Promise<Carrito | null> {
    return await CarritoRepository.findById(carritoId);
  }

  public static async updateCarrito(carritoId: number, carrito: Carrito): Promise<void> {
    carrito.updated_at = DateUtils.formatDate(new Date());
    await CarritoRepository.update(carritoId, carrito);
  }

  public static async deleteCarrito(carritoId: number): Promise<void> {
    await CarritoRepository.delete(carritoId);
  }

  public static async addItemToCarrito(carritoItem: CarritoItem): Promise<CarritoItem> {
    carritoItem.created_at = DateUtils.formatDate(new Date());
    carritoItem.updated_at = DateUtils.formatDate(new Date());
    const itemId = await CarritoRepository.addItem(carritoItem);
    carritoItem.id = itemId;
    return carritoItem;
  }

  public static async getItemsByCarritoId(carritoId: number): Promise<CarritoItem[]> {
    return await CarritoRepository.findItemsByCarritoId(carritoId);
  }

  public static async updateCarritoItem(itemId: number, carritoItem: CarritoItem): Promise<void> {
    carritoItem.updated_at = DateUtils.formatDate(new Date());
    await CarritoRepository.updateItem(itemId, carritoItem);
  }

  public static async deleteCarritoItem(itemId: number): Promise<void> {
    await CarritoRepository.deleteItem(itemId);
  }
}
