import axios from "axios";
import {
  Certificate,
  CertificateResponse,
  LoginRequest,
  LoginResponse,
  Manager,
  ManagerResponse,
  Order,
  OrderResponse,
  Promotion,
  PromotionResponse,
  UseCertificateRequest,
} from "./types";

const baseURL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: baseURL,
});

const axiosAuthorizedApi = axios.create({
  baseURL: baseURL,
});

axiosAuthorizedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosApi.post("/auth/sign_in", credentials);
  return response.data;
};

export const createOrder = async (order: Order) => {
  const response = await axiosAuthorizedApi.post("/manager/order", order);
  return response.data;
};

export const getOrders = async (): Promise<OrderResponse[]> => {
  const response = await axiosAuthorizedApi.get("/manager/orders");
  return response.data;
};

export const finishOrder = async (orderId: string) => {
  const response = await axiosAuthorizedApi.post(
    `/manager/order/finish/${orderId}`,
  );
  return response.data;
};

export const createCertificate = async (certificate: Certificate) => {
  const response = await axiosAuthorizedApi.post(
    "/manager/certificate",
    certificate,
  );
  return response.data;
};

export const useCertificate = async (data: UseCertificateRequest) => {
  const response = await axiosAuthorizedApi.post(
    `/manager/certificate/use`,
    data,
  );
  return response.data;
};

export const getCertificates = async (): Promise<CertificateResponse[]> => {
  const response = await axiosAuthorizedApi.get("/manager/certificates");
  return response.data;
};

export const createPromotion = async (promotion: Promotion) => {
  const response = await axiosAuthorizedApi.post(
    "/admin/promotion/create",
    promotion,
  );
  return response.data;
};

export const getPromotions = async (): Promise<PromotionResponse[]> => {
  const response = await axiosAuthorizedApi.get("/manager/promotions");
  return response.data;
};

export const getManagers = async (): Promise<ManagerResponse[]> => {
  const response = await axiosAuthorizedApi.get("/admin/managers");
  return response.data;
};

export const createManager = async (manager: Manager) => {
  const response = await axiosAuthorizedApi.post(
    "/admin/manager/create",
    manager,
  );
  return response.data;
};
