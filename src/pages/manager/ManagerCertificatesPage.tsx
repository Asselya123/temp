import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Spin } from "antd";
import { useState } from "react";
import CertificateCard from "@/components/certificate/CertificateCard";
import CreateCertificateForm from "@/components/certificate/CreateCertificateForm";
import { useGetCertificates } from "@/query";

export const ManagerCertificatesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const { data: certificates = [], isPending } = useGetCertificates();

    const handleSearch = () => {
        if (searchTerm.trim()) {
        }
    };

    const handleTabChange = (key: string) => {
        setActiveTab(key);

        setSearchTerm("");
    };

    const handleUse = () => {};

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
                        Create Certificate
                    </Button>
                </div>
            </div>

            {isPending ? (
                <div className="flex justify-center p-10">
                    <Spin size="large" />
                </div>
            ) : certificates.length === 0 ? (
                <Empty description="No certificates found" />
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((certificate) => (
                        <CertificateCard key={certificate.id} certificate={certificate} />
                    ))}
                </div>
            )}

            <CreateCertificateForm visible={createModalVisible} onClose={() => setCreateModalVisible(false)} />
        </div>
    );
};
