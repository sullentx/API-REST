import { RequestRepository } from "../repositories/requestRepository";
import { RequestB } from "../models/request";
import { DateUtils } from "../shared/utils/DateUtils";
import { BouquetRepository } from "../repositories/bouquetRepository";

export class RequestService {
  public static async getAllRequests(): Promise<RequestB[]> {
    try {
      return await RequestRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener pedidos: ${error.message}`);
    }
  }

  public static async getRequestById(id: number): Promise<RequestB | null> {
    try {
      return await RequestRepository.findById(id);
    } catch (error: any) {
      throw new Error(`Error al encontrar pedido: ${error.message}`);
    }
  }

  public static async createRequest(request: RequestB, userEmail:string, id: number): Promise<RequestB> {
    try {
      // Obtener el precio del ramo
      const bouquet = await BouquetRepository.findById(request.bouquet_id);
      if (!bouquet) {
        throw new Error('Bouquet not found');
      }
  
      // Configurar el resto de los campos
      request.customer_id = id
      request.bouquet_id = bouquet.id
      request.price = bouquet.price;
      request.total = request.quantity * request.price; // Calcular el total
      request.created_at = DateUtils.formatDate(new Date());
      request.created_by = userEmail
      request.updated_at = DateUtils.formatDate(new Date());
      request.updated_by = userEmail
      request.deleted = false;
  
      // Crear el pedido
      return await RequestRepository.create(request);
    } catch (error: any) {
      console.error('Error al crear pedido:', error);
      throw new Error(`Error al crear pedido: ${error.message}`);
    }
  }

  public static async updateRequest(id: number, requestData: RequestB): Promise<RequestB | null> {
    try {
      const requestFound = await RequestRepository.findById(id);
      if (requestFound) {
        
        requestData.updated_at = DateUtils.formatDate(new Date());
        return await RequestRepository.update(id, requestData);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar pedido: ${error.message}`);
    }
  }

  public static async deleteRequest(id: number): Promise<boolean> {
    try {
      return await RequestRepository.delete(id);
    } catch (error: any) {
      throw new Error(`Error al eliminar pedido: ${error.message}`);
    }
  }
  
  public static async updateRequestStatus(id: number, status_id: number, userEmail: string): Promise<RequestB | null> {
    try {
      const requestFound = await RequestRepository.findById(id);
      if (!requestFound) {
        throw new Error('Pedido no encontrado');
      }

      requestFound.status_id = status_id;
      requestFound.updated_at = DateUtils.formatDate(new Date());
      requestFound.updated_by = userEmail;

      return await RequestRepository.update(id, requestFound);
    } catch (error: any) {
      throw new Error(`Error al actualizar estado del pedido: ${error.message}`);
    }
  }

}
