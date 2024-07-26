import { requestRepository } from "../repositories/requestRepository";
import { Request } from "../models/request";
import { DateUtils } from "../shared/utils/DateUtils";
import * as dotenv from 'dotenv';

dotenv.config();

export class RequestService {

    public static async addRequest(request: Request) {
        try {
            request.status_id = 1; // Asignar el estado inicial del pedido
            request.created_at = DateUtils.formatDate(new Date());
            request.updated_at = DateUtils.formatDate(new Date());
            request.deleted = false;
    
            // Asignar valores por defecto para created_by y updated_by si no están definidos
            request.created_by = request.created_by ?? 'default_user';
            request.updated_by = request.updated_by ?? 'default_user';
    
            // Llamar a la función createRequest para insertar el pedido
            const requestId = await requestRepository.createRequest(request);
            request.id = requestId;
            
            console.log(request);
            return request;
        } catch (error: any) {
            throw new Error(`Error al crear pedido: ${error.message}`);
        }
    }
}
