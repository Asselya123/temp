import { FC, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { safeDecodeJwt } from "@/utils";
import { Loading } from "./Loading";

interface ProtectedProps {
    role: "admin" | "manager";
}

export const Protected: FC<ProtectedProps> = ({ role }) => {
    const [status, setStatus] = useState<"allowed" | "blocked" | "loading">("loading");
    const [debouncedStatus, setDebouncedStatus] = useState<"allowed" | "blocked" | "loading">(status);

    const location = useLocation();

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("token");
        if (!tokenFromLocalStorage) {
            setStatus("blocked");
            return;
        }

        const decodedToken = safeDecodeJwt<{ role: string; exp: number }>(tokenFromLocalStorage);

        if (!decodedToken) {
            setStatus("blocked");
            return;
        }

        if (decodedToken.exp < Date.now() / 1000) {
            setStatus("blocked");
            return;
        }

        if (decodedToken.role !== role) {
            setStatus("blocked");
            return;
        }

        setStatus("allowed");
    }, [location.pathname]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedStatus(status);
        }, 800);
        return () => clearTimeout(timeout);
    }, [status]);

    if (debouncedStatus === "loading") {
        return <Loading className="fixed left-0 top-0 z-50 h-screen w-screen" />;
    }
    if (debouncedStatus === "blocked") {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};
