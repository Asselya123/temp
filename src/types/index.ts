export interface User {
  id: string;
  username: string;
  role: 'admin';
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

export type OrderStatus = 'active' | 'completed' | 'expired';

export interface Order {
  id: string;
  kidName: string;
  kidAge: number;
  parentName: string;
  parentPhone: string;
  startTime: Date;
  endTime: Date;
  status: OrderStatus;
  planId: string;
  plan: Plan;
  certificateId?: string;
  certificate?: Certificate;
}