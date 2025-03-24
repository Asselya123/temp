import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// Components
import { AuthProvider } from "./context/AuthContext";
// Layouts
import MainLayout from "./layouts/MainLayout";
// Pages
import CertificatesPage from "./pages/CertificatesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

// Create a client
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
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/sign-in" element={<LoginPage />} />

              <Route element={<MainLayout />}>
                <Route path="/manager">
                  <Route index element={<OrdersPage />} />

                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="certificates" element={<CertificatesPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
