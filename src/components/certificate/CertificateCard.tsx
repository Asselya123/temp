import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Tag, Typography } from "antd";
import { CertificateResponseItem } from "@/types";

const { Text, Title } = Typography;

interface CertificateCardProps {
    certificate: CertificateResponseItem;
    onUse?: (id: string) => void;
}

const CertificateCard = ({ certificate, onUse }: CertificateCardProps) => {
    return (
        <Card
            className={`w-full border-2 transition-shadow hover:shadow-md`}
            actions={[
                <Button type="primary" onClick={() => onUse?.(certificate.id.toString())}>
                    Use
                </Button>,
                <Button danger onClick={() => onUse?.(certificate.id)}>
                    Delete
                </Button>,
            ]}
        >
            <div className="flex flex-col gap-2">
                <Title level={4} className="m-0">
                    Certificate {certificate.id}
                </Title>

                <div className="flex items-center gap-1">
                    <UserOutlined />
                    <Text strong>Buyer:</Text>
                    <Text>{certificate.buyer_full_name}</Text>
                </div>

                <div className="flex items-center gap-1">
                    <PhoneOutlined />
                    <Text strong>Buyer Phone:</Text>
                    <Text>{certificate.buyer_phone}</Text>
                </div>

                <div className="flex items-center gap-1">
                    <UserOutlined />
                    <Text strong>Receiver:</Text>
                    <Text>{certificate.receiver_full_name}</Text>
                </div>

                <div className="flex items-center gap-1">
                    <PhoneOutlined />
                    <Text strong>Receiver Phone:</Text>
                    <Text>{certificate.receiver_phone}</Text>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    <Tag color="purple">Plan: {certificate.promotion_name}</Tag>
                </div>
            </div>
        </Card>
    );
};

export default CertificateCard;
