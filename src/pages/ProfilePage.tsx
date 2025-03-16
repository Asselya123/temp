import { Card, Typography, Avatar, Divider, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <Title level={2} className="mb-6">Admin Profile</Title>
      
      <Card className="shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Avatar size={100} icon={<UserOutlined />} className="mb-4" />
          <Title level={3} className="m-0">{user?.username}</Title>
          <Text type="secondary">Administrator</Text>
        </div>
        
        <Divider />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text type="secondary">Username</Text>
            <div className="font-medium">{user?.username}</div>
          </div>
          
          <div>
            <Text type="secondary">Role</Text>
            <div className="font-medium capitalize">{user?.role}</div>
          </div>
        </div>
        
        <Divider />
        
        <div className="flex justify-center">
          <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;