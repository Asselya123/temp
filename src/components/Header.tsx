import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "../assets/logo.png";

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/orders",
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: "/certificates",
      label: <Link to="/manager/certificates">Certificates</Link>,
    },
    {
      key: "/profile",
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  return (
    <AntHeader className="flex items-center justify-between bg-white px-6 shadow-md">
      <div className="flex items-center">
        <Link to="/" className="mr-6 flex items-center">
          <img src={logoIcon} alt="logo" className="h-10" />
        </Link>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-b-0"
        />
      </div>
    </AntHeader>
  );
};

export default Header;
