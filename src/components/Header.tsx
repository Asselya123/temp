import { Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "@/assets/logo.png";

const { Header: AntHeader } = Layout;

interface HeaderProps {
    menuItems: ItemType<MenuItemType>[];
}

export const Header: FC<HeaderProps> = ({ menuItems }) => {
    const location = useLocation();

    return (
        <AntHeader className="flex items-center bg-white px-6 shadow-md">
            <div className="flex w-full items-center justify-between">
                <Link to="/" className="mr-6 flex items-center">
                    <img src={logoIcon} alt="logo" className="h-10" />
                </Link>

                <Menu mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} className="flex grow justify-end" />
            </div>
        </AntHeader>
    );
};
