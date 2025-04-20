import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
    const navigate = useNavigate();

    return (
        <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={() => {
                localStorage.removeItem("token");
                navigate("/");
            }}
        >
            <Button size="middle" type="primary" danger>
                Logout
            </Button>
        </Popconfirm>
    );
};
