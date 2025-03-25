import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  createCertificate,
  createManager,
  createOrder,
  createPromotion,
  finishOrder,
  getCertificates,
  getOrders,
  getPromotions,
  login,
  useCertificate,
} from "./axios";
import {
  Certificate,
  LoginRequest,
  LoginResponse,
  Manager,
  Order,
  OrderResponse,
  Promotion,
  PromotionResponse,
  UseCertificateRequest,
} from "./types";

// Query hooks
export const useGetOrders = () => {
  return useQuery<OrderResponse[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const data = await getOrders();
      return data;
    },
  });
};

export const useGetCertificates = () => {
  return useQuery<Certificate[]>({
    queryKey: ["certificates"],
    queryFn: async () => {
      const data = await getCertificates();
      return data;
    },
  });
};

// Mutation hooks
export const useLoginMutation = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    async mutationFn(credentials) {
      return await login(credentials);
    },
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      const role = jwtDecode<{ role: string }>(data.token).role;
      if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/admin");
      }
      message.success("Login successful!");
    },
    onError() {
      message.error("Login failed");
    },
  });
};

export const useCreateOrderMutation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, Order>({
    async mutationFn(order) {
      return await createOrder(order);
    },
    onSuccess() {
      message.success("Order created successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError() {
      message.error("Failed to create order");
    },
  });
};

export const useFinishOrderMutation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, string>({
    async mutationFn(orderId) {
      return await finishOrder(orderId);
    },
    onSuccess() {
      message.success("Order finished successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError() {
      message.error("Failed to finish order");
    },
  });
};

export const useCreateCertificateMutation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, Certificate>({
    async mutationFn(certificate) {
      return await createCertificate(certificate);
    },
    onSuccess() {
      message.success("Certificate created successfully!");
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
    onError() {
      message.error("Failed to create certificate");
    },
  });
};

export const useUseCertificateMutation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, UseCertificateRequest>({
    async mutationFn(data) {
      return await useCertificate(data);
    },
    onSuccess() {
      message.success("Certificate used successfully!");
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
    onError() {
      message.error("Failed to use certificate");
    },
  });
};

export const useGetPromotions = () => {
  return useQuery<PromotionResponse[]>({
    queryKey: ["promotions"],
    queryFn: async () => {
      const data = await getPromotions();
      return data;
    },
  });
};

export const useCreatePromotionMutation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, Promotion>({
    async mutationFn(promotion) {
      return await createPromotion(promotion);
    },
    onSuccess() {
      message.success("Promotion created successfully!");
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
    },
    onError() {
      message.error("Failed to create promotion");
    },
  });
};

export const useCreateManagerMutation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, Manager>({
    async mutationFn(manager) {
      return await createManager(manager);
    },
    onSuccess() {
      message.success("Manager created successfully!");
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
    onError() {
      message.error("Failed to create manager");
    },
  });
};
