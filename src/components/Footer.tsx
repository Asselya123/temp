import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

export const Footer = () => {
    return <AntdFooter className="text-center">MiniLand Kids Club Admin Panel ©{new Date().getFullYear()}</AntdFooter>;
};
