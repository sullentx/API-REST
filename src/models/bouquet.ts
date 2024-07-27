export interface Bouquet {
    id: number;
    name: string;
    type_name: string;
    details: string;
    price: number;
    quantity: number;
    is_precreated: boolean;
    image_url:string;
    flower_quantity: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by?: string;
    deleted: boolean;
  }
   