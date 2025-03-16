import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </Content>
      <Footer className="text-center">
        MiniLand Kids Club Admin Panel ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default MainLayout;