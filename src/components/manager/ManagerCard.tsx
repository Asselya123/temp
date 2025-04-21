import { Avatar, Button, Card, Form, Input, Popconfirm } from "antd";
import { useUpdateManagerForm } from "@/forms";
import { useFireManagerMutation, useHireManagerMutation } from "@/query";
import { ManagerResponseItem } from "@/types";

interface ManagerCardProps {
    manager: ManagerResponseItem;
}

const ManagerCard = ({ manager }: ManagerCardProps) => {
    const { formik } = useUpdateManagerForm(manager);
    const { mutateAsync: hireManager } = useHireManagerMutation();
    const { mutateAsync: fireManager } = useFireManagerMutation();
    return (
        <Card title={`Manager #${manager.id}`}>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
                <div className="flex gap-4">
                    <Avatar src={manager.photo_url} size={150} />
                    <div className="grow">
                        <div className="flex gap-2">
                            <Form.Item label="Username" className="w-full">
                                <Input name="username" value={manager.username} placeholder="Enter username" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
                                help={formik.touched.password && formik.errors.password}
                                className="w-full"
                            >
                                <Input.Password
                                    name="password"
                                    value={"12345678"}
                                    disabled
                                    placeholder="Enter password"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </div>
                        <div className="flex gap-2">
                            <Form.Item
                                label="Full Name"
                                validateStatus={formik.touched.full_name && formik.errors.full_name ? "error" : ""}
                                help={formik.touched.full_name && formik.errors.full_name}
                                className="w-full"
                            >
                                <Input name="full_name" value={manager.full_name} placeholder="Enter full name" />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                validateStatus={formik.touched.phone && formik.errors.phone ? "error" : ""}
                                help={formik.touched.phone && formik.errors.phone}
                                className="w-full"
                            >
                                <Input name="phone" value={manager.phone} placeholder="Enter phone number" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <Form.Item
                        label="Hired Date"
                        validateStatus={formik.touched.hired_date && formik.errors.hired_date ? "error" : ""}
                        help={formik.touched.hired_date && formik.errors.hired_date}
                        className="w-full"
                    >
                        <Input
                            name="hired_date"
                            value={manager.hired_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter hired date"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Fire Date"
                        validateStatus={formik.touched.fired_date && formik.errors.fired_date ? "error" : ""}
                        help={formik.touched.fired_date && formik.errors.fired_date}
                        className="w-full"
                    >
                        <Input
                            name="fired_date"
                            value={manager.fired_date || "-"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter fired date"
                        />
                    </Form.Item>
                    {manager.status === "active" ? (
                        <Popconfirm
                            title="Are you sure you want to fire this manager?"
                            onConfirm={async () => await fireManager(manager.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger type="primary" htmlType="submit" size="large">
                                Fire
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title="Are you sure you want to hire this manager?"
                            onConfirm={async () => await hireManager(manager.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" htmlType="submit" size="large">
                                Hire
                            </Button>
                        </Popconfirm>
                    )}
                </div>
            </Form>
        </Card>
    );
};

export default ManagerCard;
