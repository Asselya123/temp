export interface Manager {
    username: string;
    password: string;
    phone: string;
    full_name: string;
    photo_url: string;
    hired_date: string;
    fired_date: string | null;
}

export interface ManagerResponseItem extends Manager {
    id: string;
}

export interface ManagerResponse {
    data: ManagerResponseItem[];
}

export interface Order {
    promotion_name: string;
    order_type: string;
    child_full_name: string;
    child_age: number;
    parent_full_name: string;
    parent_phone: string;
}

export interface OrderResponseItem extends Order {
    id: string;
    status: string;
    order_date: string;
    order_time: string;
}

export interface OrderResponse {
    data: OrderResponseItem[];
}

export interface Certificate {
    buyer_full_name: string;
    buyer_phone: string;
    receiver_full_name: string;
    receiver_phone: string;
    promotion_name: string;
}

export interface CertificateResponseItem extends Certificate {
    id: string;
}

export interface CertificateResponse {
    data: CertificateResponseItem[];
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
    duration: number;
    penalty: number;
}

export interface PromotionResponseItem extends Promotion {
    id: string;
}

export interface PromotionResponse {
    data: PromotionResponseItem[];
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    data: {
        token: string;
    };
}

export interface Statistics {
    statistics: {
        total_earnings: number;
        total_orders: number;
    };
    manager: {
        id: number;
        status: string;
        username: string;
        role: string;
        phone: string;
        full_name: string;
        fired_date: string | null;
        hired_date: string;
    };
}

export interface StatisticsResponse {
    data: Statistics[];
}
