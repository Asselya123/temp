import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Spin, Typography } from "antd";
import { useState } from "react";
import CertificateCard from "@/components/certificate/CertificateCard";
import CreateCertificateForm from "@/components/certificate/CreateCertificateForm";
import { useGetCertificates } from "@/query";

export const ManagerCertificatesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [createModalVisible, setCreateModalVisible] = useState(false);

    const { data: certificates = [], isPending } = useGetCertificates();

    const displayCertificates = certificates.filter(
        (certificate) =>
            certificate.buyer_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            certificate.receiver_phone.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return (
        <div>
            <Typography.Title level={3}>Search by phone number</Typography.Title>
            <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex w-full gap-2 sm:w-auto">
                    <Input
                        placeholder="+7 (000) 000-00-00"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<SearchOutlined />}
                        className="w-full sm:w-64"
                    />
                    <Button type="primary">Search</Button>
                </div>
                <div className="mb-4 flex justify-end">
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>
                        Create Certificate
                    </Button>
                </div>
            </div>

            {isPending ? (
                <div className="flex justify-center p-10">
                    <Spin size="large" />
                </div>
            ) : displayCertificates.length === 0 ? (
                <Empty description="No certificates found" />
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {displayCertificates.map((certificate) => (
                        <CertificateCard key={certificate.id} certificate={certificate} />
                    ))}
                </div>
            )}

            <CreateCertificateForm visible={createModalVisible} onClose={() => setCreateModalVisible(false)} />
        </div>
    );
};
