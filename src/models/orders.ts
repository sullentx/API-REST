export interface Orders {
    id: number;
    customer_id: number;
    delivery_man_id: number;
    order_date: string; 
    total: number;
    delivery_status: number; 
    created_at: string; 
    created_by: string;
    updated_at: string; 
    updated_by: string;
    deleted: boolean;
  }
  