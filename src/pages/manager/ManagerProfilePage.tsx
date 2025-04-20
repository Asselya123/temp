import { Avatar, Card, Form, Input } from "antd";
import { LogoutButton } from "@/components/LogoutButton";
import { useGetManagerProfile } from "@/query";

export const ManagerProfilePage = () => {
    const { data: manager } = useGetManagerProfile();
    if (!manager) return <div>Loading...</div>;
    return (
        <div>
            <Card title={`Profile`}>
                <Form layout="vertical">
                    <div className="flex gap-4">
                        <Avatar src={manager.photo_url} size={150} />
                        <div className="grow">
                            <div className="flex gap-2">
                                <Form.Item label="Full Name" className="w-full">
                                    <Input value={manager.full_name} />
                                </Form.Item>
                                <Form.Item label="Username" className="w-full">
                                    <Input value={manager.username} />
                                </Form.Item>
                            </div>
                            <div className="flex gap-2">
                                <Form.Item label="Phone Number" className="w-full">
                                    <Input value={manager.phone} />
                                </Form.Item>
                                <Form.Item label="Password" className="w-full">
                                    <Input.Password value={"12345678"} style={{ width: "100%" }} disabled />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
            </Card>
            <div className="mt-4 flex justify-end">
                <LogoutButton size="large" />
            </div>
        </div>
    );
};
