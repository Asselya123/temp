import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Spin, Tabs } from "antd";
import { useState } from "react";
import CreateOrderForm from "@/components/order/CreateOrderForm";
import OrderCard from "@/components/order/OrderCard";
import { OrderDetailsForm } from "@/components/order/OrderDetailsForm";
import { useGetOrders } from "@/query";
import { OrderResponseItem } from "@/types";

export const ManagerOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponseItem | null>(null);

    const { data: orders = [], isPending } = useGetOrders({
        status: activeTab === "all" || activeTab === "expired" ? null : activeTab === "completed" ? "finished" : activeTab,
    });

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setSearchTerm("");
    };

    let displayOrders = orders.filter((order) => order.child_full_name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (activeTab === "expired") {
        displayOrders = displayOrders.filter((order) => {
            return new Date(order.end_date) < new Date();
        });
    }

    return (
        <div>
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex w-full gap-2 sm:w-auto">
                    <Input
                        placeholder="Search by kid's name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<SearchOutlined />}
                        className="w-full sm:w-64"
                    />
                    <Button type="primary">Search</Button>
                </div>
                <div className="mb-4 flex justify-end">
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>
                        Create Order
                    </Button>
                </div>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                className="mb-4"
                items={[
                    { label: "All", key: "all" },
                    { label: "Active", key: "active" },
                    { label: "Completed", key: "completed" },
                    { label: "Expired", key: "expired" },
                ]}
            />

            {isPending ? (
                <div className="flex justify-center p-10">
                    <Spin size="large" />
                </div>
            ) : displayOrders.length === 0 ? (
                <Empty description="No orders found" />
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {displayOrders.map((order) => (
                        <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
                    ))}
                </div>
            )}

            <CreateOrderForm visible={createModalVisible} onClose={() => setCreateModalVisible(false)} />
            {selectedOrder && (
                <OrderDetailsForm visible={selectedOrder !== null} onClose={() => setSelectedOrder(null)} order={selectedOrder} />
            )}
        </div>
    );
};
