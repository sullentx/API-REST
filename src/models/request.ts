export interface Request {
    id: number;
    customer_id: number;
    delivery_man_id: number;
    status_id: number; 
    request_date: string; 
    total: number;
    created_at: string; 
    created_by: string;
    updated_at: string; 
    updated_by: string;
    deleted: boolean;
  }
