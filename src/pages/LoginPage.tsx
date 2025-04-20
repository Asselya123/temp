import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import loginBg from "@/assets/login-bg.png";
import logo from "@/assets/logo.png";
import { useLoginForm } from "@/forms";

const { Title } = Typography;

const LoginPage = () => {
    const { formik } = useLoginForm();

    const onFinish = async () => {
        await formik.submitForm();
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center">
            <div className="flex w-1/2 items-center justify-center">
                <Card className="w-[400px] max-w-md shadow-lg">
                    <div className="mb-6 text-center">
                        <img src={logo} alt="MiniLand Logo" className="m-4 w-[160px]" />
                        <Title level={4} className="mt-0">
                            Login to continue
                        </Title>
                    </div>

                    <Form
                        name="login"
                        initialValues={{
                            username: formik.values.username,
                            password: formik.values.password,
                        }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                size="large"
                                onChange={(e) => formik.setFieldValue("username", e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                                size="large"
                                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full" size="large" loading={formik.isSubmitting}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <div>
                <img src={loginBg} alt="MiniLand Logo" className="h-screen w-[50vw] object-cover" />
            </div>
        </div>
    );
};

export default LoginPage;
