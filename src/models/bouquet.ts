export interface Bouquet {
    id?: number;
    name: string;
    is_precreated: boolean;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted?: boolean;
    image:BouquetImage[];
  }
  export interface BouquetType {
    id?: number;
    type_name: string;
    details: string;
    price: number;
    created_by: string;
    updated_by: string;
    deleted?: boolean
  }
  export interface BouquetImage {
    id?: number;
    bouquet_id?: number;
    image_url: string;
  }