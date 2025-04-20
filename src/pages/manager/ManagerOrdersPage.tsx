import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Spin, Tabs } from "antd";
import { useState } from "react";
import CreateOrderForm from "@/components/order/CreateOrderForm";
import OrderCard from "@/components/order/OrderCard";
import { useGetOrders } from "@/query";

export const ManagerOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const { data: orders = [], isPending } = useGetOrders();

    const handleSearch = () => {
        if (searchTerm.trim()) {
        }
    };

    const handleTabChange = (key: string) => {
        setActiveTab(key);

        setSearchTerm("");
    };

    const displayOrders = orders;

    const handleMarkComplete = () => {};

    return (
        <div>
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex w-full gap-2 sm:w-auto">
                    <Input
                        placeholder="Search by kid's name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onPressEnter={handleSearch}
                        prefix={<SearchOutlined />}
                        className="w-full sm:w-64"
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
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
                        <OrderCard key={order.id} order={order} onMarkComplete={handleMarkComplete} />
                    ))}
                </div>
            )}

            <CreateOrderForm visible={createModalVisible} onClose={() => setCreateModalVisible(false)} />
        </div>
    );
};
