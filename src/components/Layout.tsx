import { Layout as AntdLayout } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LogoutButton } from "./LogoutButton";

const MANAGER_MENU_ITEMS: ItemType<MenuItemType>[] = [
    {
        key: "/manager",
        label: <Link to="/manager">Orders</Link>,
    },
    {
        key: "/manager/certificates",
        label: <Link to="/manager/certificates">Certificates</Link>,
    },
    {
        key: "/manager/profile",
        label: <Link to="/manager/profile">Profile</Link>,
    },
];

const ADMIN_MENU_ITEMS = [
    {
        key: "/admin",
        label: <Link to="/admin">Statistics</Link>,
    },
    {
        key: "/admin/managers",
        label: <Link to="/admin/managers">Managers</Link>,
    },

    {
        key: "/admin/certificates",
        label: <Link to="/admin/certificates">Certificates</Link>,
    },
    {
        key: "/admin/orders",
        label: <Link to="/admin/orders">Orders</Link>,
    },
    {
        key: "/admin/promotions",
        label: <Link to="/admin/promotions">Promotions</Link>,
    },
    {
        key: "/admin/logout",
        label: <LogoutButton />,
    },
];

interface LayoutProps {
    role: "admin" | "manager";
}

export const Layout: FC<LayoutProps> = ({ role }) => {
    return (
        <AntdLayout className="min-h-screen">
            <Header menuItems={role === "admin" ? ADMIN_MENU_ITEMS : MANAGER_MENU_ITEMS} />
            <AntdLayout.Content className="bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <Outlet />
                </div>
            </AntdLayout.Content>
            <Footer />
        </AntdLayout>
    );
};
