export interface RequestB {
    id: number;
    customer_id: number;
    bouquet_id : number;
    quantity: number;
    price:number;
    total:number;
    status_id: number; 
    delivery_man_id: number;
    request_date: string; 
    created_at: string; 
    created_by: string;
    updated_at: string; 
    updated_by: string;
    deleted: boolean;
  }
