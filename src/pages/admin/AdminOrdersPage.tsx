import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Empty, Input, Spin, Tabs } from "antd";
import { useState } from "react";
import { AdminOrderCard } from "@/components/order/AdminOrderCard";
import { useGetAdminOrders } from "@/query";

export const AdminOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "active" | "completed" | "expired">("all");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const { data: orders = [], isPending } = useGetAdminOrders({
        startDate,
        endDate,
        status: activeTab === "all" || activeTab === "expired" ? null : activeTab === "completed" ? "finished" : activeTab,
    });

    const handleTabChange = (key: string) => {
        setActiveTab(key as "all" | "active" | "completed" | "expired");
        setSearchTerm("");
    };

    let displayOrders = orders.filter((order) => {
        return order.child_full_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (activeTab === "expired") {
        displayOrders = displayOrders.filter((order) => {
            return new Date(order.end_time) < new Date();
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
                <DatePicker.RangePicker
                    size="large"
                    onChange={(dates) => {
                        setStartDate(dates?.[0].toISOString());
                        setEndDate(dates?.[1].toISOString());
                    }}
                />
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                className="mb-4"
                items={[
                    { label: "All", key: "all" },
                    { label: "Active", key: "active" },
                    { label: "Finished", key: "finished" },
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
                        <AdminOrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};
