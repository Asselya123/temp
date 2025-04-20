import { DeleteOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Typography } from "antd";
import { useDeletePromotionMutation } from "@/query";
import { PromotionResponseItem } from "@/types";

const { Text, Title } = Typography;

interface PromotionCardProps {
    promotion: PromotionResponseItem;
}

export const PromotionCard = ({ promotion }: PromotionCardProps) => {
    const { mutateAsync: deletePromotion } = useDeletePromotionMutation();
    return (
        <Card className={`relative w-full border-2 transition-shadow hover:shadow-md`}>
            <div className="flex flex-col gap-2">
                <Title level={3} className="m-0">
                    Promotion {promotion.name}
                </Title>

                <div className="flex items-center gap-1">
                    <PhoneOutlined />
                    <Text strong>Cost:</Text>
                    <Text>{promotion.cost} ₸</Text>
                </div>

                <div className="flex items-center gap-1">
                    <UserOutlined />
                    <Text strong>Duration:</Text>
                    <Text>{promotion.duration}</Text>
                </div>

                <div className="flex items-center gap-1">
                    <PhoneOutlined />
                    <Text strong>Penalty per minute:</Text>
                    <Text>{promotion.penalty} ₸</Text>
                </div>
                <div className="absolute bottom-4 right-4">
                    <Popconfirm title="Are you sure?" onConfirm={async () => await deletePromotion(promotion.id)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="large" />
                    </Popconfirm>
                </div>
            </div>
        </Card>
    );
};
