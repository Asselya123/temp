import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Tag, Typography } from "antd";
import { useState } from "react";
import { useDeleteCertificateMutation } from "@/query";
import { CertificateResponseItem } from "@/types";
import { UseCertificateForm } from "./UseCertificateForm";

const { Text, Title } = Typography;

interface CertificateCardProps {
    certificate: CertificateResponseItem;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
    const { mutateAsync: deleteCertificate, isPending } = useDeleteCertificateMutation();
    const [isUseModalVisible, setIsUseModalVisible] = useState(false);

    return (
        <Card
            className={`w-full border-2 transition-shadow hover:shadow-md`}
            actions={[
                <Button type="primary" onClick={() => setIsUseModalVisible(true)}>
                    Use
                </Button>,
                <Popconfirm title="Are you sure?" onConfirm={async () => await deleteCertificate(certificate.id)}>
                    <Button danger loading={isPending}>
                        Delete
                    </Button>
                </Popconfirm>,
            ]}
        >
            <div className="flex flex-col gap-2">
                <Title level={4} className="m-0">
                    Certificate #{certificate.id}
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
                    <Tag color="blue">Cost: {certificate.cost} ₸</Tag>
                    <Tag color="green">Valid until: {new Date(certificate.valid_until).toLocaleDateString()}</Tag>
                </div>
            </div>
            {isUseModalVisible && (
                <UseCertificateForm visible={isUseModalVisible} onClose={() => setIsUseModalVisible(false)} certificate={certificate} />
            )}
        </Card>
    );
};

export default CertificateCard;
