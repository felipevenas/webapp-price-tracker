export interface ProductResponse {
  id: string; // UUID
  name: string;
  url: string;
  target_price: number | null;
  check_interval_minutes: number;
  current_price: number | null;
  active: boolean;
  last_checked_at: string | null; // ISO Date
  created_at: string;
  updated_at: string;
}

export interface PriceHistoryResponse {
  id: string;
  product_id: string;
  price: number;
  checked_at: string; // ISO Date
}

export interface CreateProductPayload {
  name: string;
  url: string;
  target_price?: number | null;
  check_interval_minutes?: number;
}

export interface UpdateProductPayload {
  name?: string;
  target_price?: number | null;
  check_interval_minutes?: number;
  active?: boolean;
}
