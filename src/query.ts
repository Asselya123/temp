import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
    createCertificate,
    createManager,
    createOrder,
    createPromotion,
    deleteCertificate,
    deletePromotion,
    finishOrder,
    getAdminCertificates,
    getAdminOrders,
    getAdminPromotions,
    getCertificates,
    getManagerProfile,
    getManagers,
    getOrders,
    getPromotions,
    getStatistics,
    login,
    useCertificate,
} from "./axios";
import {
    Certificate,
    CertificateResponseItem,
    LoginRequest,
    LoginResponse,
    Manager,
    ManagerResponseItem,
    Order,
    OrderResponseItem,
    Promotion,
    PromotionResponseItem,
    UseCertificateRequest,
} from "./types";
import { safeDecodeJwt } from "./utils";

export const useGetOrders = () => {
    return useQuery<OrderResponseItem[]>({
        queryKey: ["orders"],
        queryFn: async () => {
            const data = await getOrders();
            return data;
        },
    });
};

export const useGetStatistics = ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
    return useQuery({
        queryKey: ["statistics", startDate, endDate],
        queryFn: () => getStatistics({ startDate, endDate }),
    });
};

export const useGetAdminOrders = ({ startDate, endDate, status }: { startDate?: string; endDate?: string; status?: string }) => {
    return useQuery<OrderResponseItem[]>({
        queryKey: ["adminOrders", startDate, endDate, status],
        queryFn: async () => {
            const data = await getAdminOrders({ startDate, endDate, status });
            return data;
        },
    });
};
export const useGetCertificates = () => {
    return useQuery<CertificateResponseItem[]>({
        queryKey: ["certificates"],
        queryFn: async () => {
            const data = await getCertificates();
            return data;
        },
    });
};

export const useGetAdminCertificates = () => {
    return useQuery<CertificateResponseItem[]>({
        queryKey: ["adminCertificates"],
        queryFn: async () => {
            const data = await getAdminCertificates();
            return data;
        },
    });
};

export const useLoginMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<LoginResponse, AxiosError, LoginRequest>({
        async mutationFn(credentials) {
            return await login(credentials);
        },
        onSuccess({ data }) {
            localStorage.setItem("token", data.token);

            const role = safeDecodeJwt<{ role: string }>(data.token)?.role;

            if (role === "manager") {
                navigate("/manager");
            } else if (role === "admin") {
                navigate("/admin");
            } else {
                message.error("Invalid role");
                localStorage.removeItem("token");
                navigate("/");
                return;
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
    const navigate = useNavigate();
    return useMutation<any, AxiosError, UseCertificateRequest>({
        async mutationFn(data) {
            return await useCertificate(data);
        },
        onSuccess() {
            message.success("Certificate used successfully!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            navigate("/manager/orders");
        },
        onError() {
            message.error("Failed to use certificate");
        },
    });
};

export const useGetPromotions = () => {
    return useQuery<PromotionResponseItem[]>({
        queryKey: ["promotions"],
        queryFn: async () => {
            const data = await getPromotions();
            return data;
        },
    });
};

export const useGetAdminPromotions = () => {
    return useQuery<PromotionResponseItem[]>({
        queryKey: ["adminPromotions"],
        queryFn: async () => {
            const data = await getAdminPromotions();
            return data;
        },
    });
};

export const useDeletePromotionMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, string>({
        async mutationFn(promotionId) {
            return await deletePromotion(promotionId);
        },
        onSuccess() {
            message.success("Promotion deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["promotions"] });
            queryClient.invalidateQueries({ queryKey: ["adminPromotions"] });
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
            queryClient.invalidateQueries({ queryKey: ["adminPromotions"] });
        },
        onError() {
            message.error("Failed to create promotion");
        },
    });
};

export const useGetManagers = () => {
    return useQuery<ManagerResponseItem[]>({
        queryKey: ["managers"],
        queryFn: async () => {
            const { data } = await getManagers();
            return data;
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

export const useGetManagerProfile = () => {
    return useQuery<ManagerResponseItem>({
        queryKey: ["managerProfile"],
        queryFn: async () => {
            const { data } = await getManagerProfile();
            return data;
        },
    });
};

export const useDeleteCertificateMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, string>({
        async mutationFn(certificateId) {
            return await deleteCertificate(certificateId);
        },
        onSuccess() {
            message.success("Certificate deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
        },
        onError() {
            message.error("Failed to delete certificate");
        },
    });
};
