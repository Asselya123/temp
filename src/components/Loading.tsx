import { Spin } from "antd";
import classNames from "classnames";
import { FC } from "react";

interface LoadingProps {
    className?: string;
}

export const Loading: FC<LoadingProps> = ({ className }) => {
    return (
        <div className={classNames("flex h-full w-full items-center justify-center bg-white", className)}>
            <Spin size="large" />
        </div>
    );
};
