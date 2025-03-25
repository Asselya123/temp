import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApi } from "@/axios";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const validateUserAccess = (user: User | null) => {
    if (!user?.role) {
      if (location.pathname !== "/sign-in") {
        navigate("/sign-in");
      }
      return false;
    }

    const isAdminPath = location.pathname.includes("/admin");
    const isManagerPath = location.pathname.includes("/manager");

    if (
      (user.role === "admin" && isAdminPath) ||
      (user.role === "manager" && isManagerPath)
    ) {
      return true;
    }

    if (location.pathname !== "/sign-in") {
      navigate("/sign-in");
    }
    return false;
  };

  const login = async (username: string, password: string) => {
    const {
      data: { token },
    } = await axiosApi.post("auth/sign_in", {
      username,
      password,
    });
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode<User>(token);
    setUser(decodedUser);
    const isAdmin = decodedUser.role === "admin";
    const isManager = decodedUser.role === "manager";
    if (isAdmin) {
      navigate("/admin");
      return;
    }
    if (isManager) {
      navigate("/manager");
      return;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/sign-in");
  };

  useEffect(() => {
    return;
    const token = localStorage.getItem("token");
    let decodedUser: User | null = null;

    try {
      decodedUser = token ? jwtDecode<User>(token) : null;
      setUser(decodedUser);
    } catch {
      decodedUser = null;
    }

    const hasValidAccess = validateUserAccess(decodedUser);
    console.log("hasValidAccess", hasValidAccess);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
