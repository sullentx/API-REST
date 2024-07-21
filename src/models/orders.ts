export interface Orders {
    id: number;
    customer_id: number;
    delivery_man_id: number;
    order_date: string; // Se usa una cadena en formato ISO 8601
    total: number;
    delivery_status: number; // Referencia al ID del estado en la tabla `status`
    created_at: string; // Se usa una cadena en formato ISO 8601
    created_by: string;
    updated_at: string; // Se usa una cadena en formato ISO 8601
    updated_by: string;
    deleted: boolean;
  }
  