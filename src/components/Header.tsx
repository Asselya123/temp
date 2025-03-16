import { Button, Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const menuItems = [
    {
      key: '/orders',
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: '/certificates',
      label: <Link to="/certificates">Certificates</Link>,
    },
    {
      key: '/profile',
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  return (
    <AntHeader className="flex items-center justify-between bg-white shadow-md px-6">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-6">
          <Title level={3} className="m-0 text-blue-600">MiniLand</Title>
        </Link>
        
        {isAuthenticated && (
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="border-b-0"
          />
        )}
      </div>
      
      {isAuthenticated ? (
        <Button type="link" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
      )}
    </AntHeader>
  );
};

export default Header;