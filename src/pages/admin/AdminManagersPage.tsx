import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Spin } from "antd";
import { useState } from "react";
import CreateManagerForm from "@/components/manager/CreateManagerForm";
import ManagerCard from "@/components/manager/ManagerCard";
import { useGetManagers } from "@/query";

export const AdminManagersPage = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);

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
                <div className="flex flex-col gap-4">
                    {managers
                        .sort((a, b) => Number(a.id) - Number(b.id))
                        .map((manager) => (
                            <ManagerCard key={manager.id} manager={manager} />
                        ))}
                </div>
            )}

            <div className="mb-14 mt-4 flex justify-end">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>
                    Create Manager
                </Button>
            </div>

            <CreateManagerForm visible={createModalVisible} onClose={() => setCreateModalVisible(false)} />
        </div>
    );
};
