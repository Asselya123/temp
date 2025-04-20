import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
    size?: "middle" | "small" | "large";
}

export const LogoutButton = ({ size = "middle" }: LogoutButtonProps) => {
    const navigate = useNavigate();

    return (
        <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={() => {
                localStorage.removeItem("token");
                navigate("/");
            }}
        >
            <Button size={size} type="primary" danger>
                Logout
            </Button>
        </Popconfirm>
    );
};
