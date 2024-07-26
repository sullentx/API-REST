export interface Carrito {
    id?: number;
    customer_id: number;
    created_at?: string;
    created_by: string;
    updated_at?: string;
    updated_by: string;
    deleted?: boolean;
  }
  
  export interface CarritoItem {
    id?: number;
    carrito_id: number;
    bouquet_id: number;
    quantity: number;
    price: number;
    total: number;
    created_at?: string;
    created_by: string;
    updated_at?: string;
    updated_by: string;
    deleted?: boolean;
  }
  
  