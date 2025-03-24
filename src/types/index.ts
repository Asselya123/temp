export interface User {
  user_id: number;
  role: "admin" | "manager";
}

export interface Certificate {
  id: string;
  code: string;
  duration: number; // in minutes
  isUsed: boolean;
  issuedAt: Date;
  expiresAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
}

export type OrderStatus = "active" | "completed" | "expired";

export interface Order {
  id: number;
  status: OrderStatus;
  promotion_name: string;
  child_age: number;
  child_full_name: string;
  order_type: string;
  parent_full_name: string;
  parent_phone: string;
  order_date: string;
  order_time: string;
}
