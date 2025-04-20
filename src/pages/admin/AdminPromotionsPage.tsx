import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Spin, Typography } from "antd";
import { useState } from "react";
import { CreatePromotionForm } from "@/components/promotion/CreatePromotionForm";
import { PromotionCard } from "@/components/promotion/PromotionCard";
import { useGetAdminPromotions } from "@/query";

export const AdminPromotionsPage = () => {
    const { data: promotions = [], isPending } = useGetAdminPromotions();
    const [createPromotionModal, setCreatePromotionModal] = useState(false);

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <Typography.Title level={3} className="m-0 !mb-0">
                    Your Promotions
                </Typography.Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreatePromotionModal(true)}>
                    Create Promotion
                </Button>
            </div>
            {isPending ? (
                <div className="flex justify-center p-10">
                    <Spin size="large" />
                </div>
            ) : promotions.length === 0 ? (
                <Empty description="No promotions found" />
            ) : (
                <div className="flex flex-col gap-4">
                    {promotions.map((promotion) => (
                        <PromotionCard key={promotion.id} promotion={promotion} />
                    ))}
                </div>
            )}
            <CreatePromotionForm visible={createPromotionModal} onClose={() => setCreatePromotionModal(false)} />
        </div>
    );
};
