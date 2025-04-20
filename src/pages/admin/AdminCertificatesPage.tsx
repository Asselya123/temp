import { SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Spin, Typography } from "antd";
import { useState } from "react";
import { AdminCertificateCard } from "@/components/certificate/AdminCertificateCard";
import { useGetAdminCertificates } from "@/query";

export const AdminCertificatesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: certificates = [], isPending } = useGetAdminCertificates();

    const handleSearch = () => {};

    return (
        <div>
            <div className="mb-6 flex flex-col items-start justify-between gap-4">
                <Typography.Title level={5}>Search certificate by phone number</Typography.Title>
                <div className="flex w-1/2 gap-2">
                    <Input
                        placeholder="+7 (999) 999-99-99"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        onPressEnter={handleSearch}
                        prefix={<SearchOutlined />}
                        className="w-full"
                        size="large"
                    />
                    <Button type="primary" onClick={handleSearch} size="large">
                        Search
                    </Button>
                </div>
            </div>

            {isPending ? (
                <div className="flex justify-center p-10">
                    <Spin size="large" />
                </div>
            ) : certificates.filter((certificate) => certificate.buyer_phone.includes(searchTerm)).length === 0 ? (
                <Empty description="No certificates found" />
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {certificates
                        .filter((certificate) => certificate.buyer_phone.includes(searchTerm))
                        .map((certificate) => (
                            <AdminCertificateCard key={certificate.id} certificate={certificate} />
                        ))}
                </div>
            )}
        </div>
    );
};
