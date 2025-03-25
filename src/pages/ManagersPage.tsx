import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Spin } from "antd";
import { useState } from "react";
import CreateManagerForm from "@/components/CreateManagerForm";
import ManagerCard from "@/components/ManagerCard";
import { useGetManagers } from "../query";

const ManagersPage = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // Fetch orders based on active tab
  const { data: managers = [], isPending } = useGetManagers();

  return (
    <div>
      {isPending ? (
        <div className="flex justify-center p-10">
          <Spin size="large" />
        </div>
      ) : managers.length === 0 ? (
        <Empty description="No managers found" />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {managers.map((manager) => (
            <ManagerCard key={manager.id} manager={manager} />
          ))}
        </div>
      )}

      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Manager
        </Button>
      </div>

      <CreateManagerForm
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </div>
  );
};

export default ManagersPage;
