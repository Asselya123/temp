import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Spin, Tabs, Typography } from "antd";
import { useState } from "react";
import CreateOrderForm from "@/components/CreateOrderForm";
import OrderCard from "@/components/OrderCard";
import { useGetOrders } from "../query";

const { Title } = Typography;

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // Fetch orders based on active tab
  const { data: orders = [], isPending } = useGetOrders();

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // searchMutation.mutate(searchTerm);
    }
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);

    // Clear search when changing tabs
    setSearchTerm("");
    // searchMutation.reset();
  };

  // Get the correct list of orders to display
  const displayOrders = orders; //searchMutation.data || orders;

  // Handle mark as completed
  const handleMarkComplete = (id: string) => {
    // updateOrderStatusMutation.mutate(id);
  };

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
          <Button
            type="primary"
            onClick={handleSearch}
            // loading={searchMutation.isPending}
          >
            Search
          </Button>
        </div>
        <div className="mb-4 flex justify-end">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
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
            <OrderCard
              key={order.id}
              order={order}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>
      )}

      <CreateOrderForm
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </div>
  );
};

export default OrdersPage;
