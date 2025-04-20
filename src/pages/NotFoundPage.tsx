import { Button, Result } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface NotFoundPageProps {
    redirectTo: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ redirectTo }) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to={redirectTo}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
};
