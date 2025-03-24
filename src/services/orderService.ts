import { v4 as uuidv4 } from "uuid";
import { axiosAuthorizedApi } from "@/axios";
import { Certificate, Order, OrderStatus, Plan } from "../types";

// Mock data
const plans: Plan[] = [
  {
    id: "1",
    name: "Basic (1 hour)",
    duration: 60, // 1 hour in minutes
    price: 15,
  },
  {
    id: "2",
    name: "Standard (2 hours)",
    duration: 120, // 2 hours in minutes
    price: 25,
  },
  {
    id: "3",
    name: "Premium (3 hours)",
    duration: 180, // 3 hours in minutes
    price: 35,
  },
  {
    id: "4",
    name: "Full Day (8 hours)",
    duration: 480, // 8 hours in minutes
    price: 80,
  },
];

const certificates: Certificate[] = [
  {
    id: "1",
    code: "FREE60",
    duration: 60, // 1 hour in minutes
    isUsed: false,
    issuedAt: new Date("2025-01-01"),
    expiresAt: new Date("2025-12-31"),
  },
  {
    id: "2",
    code: "GIFT120",
    duration: 120, // 2 hours in minutes
    isUsed: false,
    issuedAt: new Date("2025-02-01"),
    expiresAt: new Date("2025-12-31"),
  },
];

// Generate some mock orders
const generateMockOrders = (): Order[] => {
  const now = new Date();

  return [
    {
      id: "1",
      kidName: "Alex Smith",
      kidAge: 5,
      parentName: "John Smith",
      parentPhone: "+1 (123) 456-7890",
      startTime: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
      endTime: new Date(now.getTime() + 30 * 60000), // 30 minutes from now
      status: "active",
      planId: "1",
      plan: plans[0],
    },
    {
      id: "2",
      kidName: "Emma Johnson",
      kidAge: 7,
      parentName: "Michael Johnson",
      parentPhone: "+1 (234) 567-8901",
      startTime: new Date(now.getTime() - 60 * 60000), // 1 hour ago
      endTime: new Date(now.getTime() + 60 * 60000), // 1 hour from now
      status: "active",
      planId: "2",
      plan: plans[1],
    },
    {
      id: "3",
      kidName: "Olivia Davis",
      kidAge: 4,
      parentName: "Sarah Davis",
      parentPhone: "+1 (345) 678-9012",
      startTime: new Date(now.getTime() - 180 * 60000), // 3 hours ago
      endTime: new Date(now.getTime() - 60 * 60000), // 1 hour ago
      status: "completed",
      planId: "2",
      plan: plans[1],
    },
    {
      id: "4",
      kidName: "Noah Wilson",
      kidAge: 6,
      parentName: "David Wilson",
      parentPhone: "+1 (456) 789-0123",
      startTime: new Date(now.getTime() - 120 * 60000), // 2 hours ago
      endTime: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
      status: "expired",
      planId: "1",
      plan: plans[0],
    },
    {
      id: "5",
      kidName: "Sophia Garcia",
      kidAge: 8,
      parentName: "Maria Garcia",
      parentPhone: "+1 (567) 890-1234",
      startTime: new Date(now.getTime() - 90 * 60000), // 1.5 hours ago
      endTime: new Date(now.getTime() + 90 * 60000), // 1.5 hours from now
      status: "active",
      planId: "3",
      plan: plans[2],
      certificateId: "1",
      certificate: certificates[0],
    },
  ];
};

let mockOrders = generateMockOrders();

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    // Simulate API call delay
    const { data } = await axiosAuthorizedApi.get("/manager/orders");
    return data;
  },

  getOrdersByStatus: async (status: OrderStatus): Promise<Order[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockOrders.filter((order) => order.status === status);
  },

  getOrderById: async (id: number): Promise<Order | undefined> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockOrders.find((order) => order.id === id);
  },

  searchOrdersByKidName: async (name: string): Promise<Order[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const searchTerm = name.toLowerCase();
    return mockOrders.filter((order) =>
      order.kidName.toLowerCase().includes(searchTerm),
    );
  },

  createOrder: async (
    orderData: Omit<Order, "id" | "status" | "plan"> & {
      planId: string;
      certificateCode?: string;
    },
  ): Promise<{ order_id: number }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const plan = plans.find((p) => p.id === orderData.planId);
    if (!plan) {
      throw new Error("Plan not found");
    }

    let certificate: Certificate | undefined;
    if (orderData.certificateCode) {
      certificate = certificates.find(
        (c) => c.code === orderData.certificateCode && !c.isUsed,
      );
      if (certificate) {
        certificate.isUsed = true;
      }
    }

    const { data } = await axiosAuthorizedApi.post("/manager/order", {
      promotion_name: "1+2",
      order_type: orderData.order_type,
      child_full_name: orderData.child_full_name,
      child_age: orderData.child_age,
      parent_full_name: orderData.parent_full_name,
      parent_phone: orderData.parent_phone,
    });
    return data;
  },

  updateOrderStatus: async (
    id: string,
    status: OrderStatus,
  ): Promise<Order> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const orderIndex = mockOrders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    const updatedOrder = { ...mockOrders[orderIndex], status };
    mockOrders = [
      ...mockOrders.slice(0, orderIndex),
      updatedOrder,
      ...mockOrders.slice(orderIndex + 1),
    ];

    return updatedOrder;
  },

  getPlans: async (): Promise<Plan[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return plans;
  },

  getCertificates: async (): Promise<Certificate[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return certificates;
  },

  verifyCertificate: async (code: string): Promise<Certificate | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const certificate = certificates.find((c) => c.code === code && !c.isUsed);
    return certificate || null;
  },

  createCertificate: async (
    code: string,
    duration: number,
    expiryDate: Date,
  ): Promise<Certificate> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newCertificate: Certificate = {
      id: uuidv4(),
      code,
      duration,
      isUsed: false,
      issuedAt: new Date(),
      expiresAt: expiryDate,
    };

    certificates.push(newCertificate);
    return newCertificate;
  },
};
