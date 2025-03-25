export interface Manager {
  username: string;
  password: string;
  phone: string;
  full_name: string;
  photo_url: string;
}

export interface Order {
  promotion_name: string;
  order_type: string;
  child_full_name: string;
  child_age: number;
  parent_full_name: string;
  parent_phone: string;
}

export interface OrderResponse extends Order {
  id: string;
  status: string;
  order_date: string;
  order_time: string;
}

export interface Certificate {
  buyer_full_name: string;
  buyer_phone: string;
  receiver_full_name: string;
  receiver_phone: string;
  promotion_name: string;
}

export interface UseCertificateRequest {
  certificate_id: number;
  attrs: {
    order_type: string;
    promotion_name: string;
    child_full_name: string;
    child_age: number;
    parent_full_name: string;
    parent_phone: string;
  };
}

export interface Promotion {
  name: string;
  cost: number;
  duration: number; // in minutes
  penalty: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
