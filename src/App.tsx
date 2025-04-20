import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp, ConfigProvider } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Protected } from "./components/Protected";
import LoginPage from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminCertificatesPage } from "./pages/admin/AdminCertificatesPage";
import { AdminManagersPage } from "./pages/admin/AdminManagersPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminProfilePage } from "./pages/admin/AdminProfilePage";
import { AdminPromotionsPage } from "./pages/admin/AdminPromotionsPage";
import { AdminStatisticsPage } from "./pages/admin/AdminStatisticsPage";
import { ManagerCertificatesPage } from "./pages/manager/ManagerCertificatesPage";
import { ManagerOrdersPage } from "./pages/manager/ManagerOrdersPage";
import { ManagerProfilePage } from "./pages/manager/ManagerProfilePage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1677ff",
                    },
                }}
            >
                <AntdApp>
                    <Router>
                        <Routes>
                            <Route index element={<LoginPage />} />
                            <Route path="/manager/*" element={<Protected role="manager" />}>
                                <Route element={<Layout role="manager" />}>
                                    <Route index element={<ManagerOrdersPage />} />
                                    <Route path="certificates" element={<ManagerCertificatesPage />} />
                                    <Route path="profile" element={<ManagerProfilePage />} />
                                    <Route path="*" element={<NotFoundPage redirectTo="/manager" />} />
                                </Route>
                            </Route>
                            <Route path="/admin/*" element={<Protected role="admin" />}>
                                <Route element={<Layout role="admin" />}>
                                    <Route index element={<AdminStatisticsPage />} />
                                    <Route path="managers" element={<AdminManagersPage />} />
                                    <Route path="certificates" element={<AdminCertificatesPage />} />
                                    <Route path="orders" element={<AdminOrdersPage />} />
                                    <Route path="promotions" element={<AdminPromotionsPage />} />
                                    <Route path="profile" element={<AdminProfilePage />} />
                                    <Route path="*" element={<NotFoundPage redirectTo="/admin" />} />
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFoundPage redirectTo="/" />} />
                        </Routes>
                    </Router>
                </AntdApp>
            </ConfigProvider>
        </QueryClientProvider>
    );
}

export default App;
