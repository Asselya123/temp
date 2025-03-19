import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/images/login-bg.png";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(values.username, values.password);
      navigate("/orders");
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
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

          {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )}

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <div>
        <img
          src={loginBg}
          alt="MiniLand Logo"
          className="h-screen w-[50vw] object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
