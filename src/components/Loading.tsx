import { Spin } from "antd";
import { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
      <Spin size="large" />
    </div>
  );
};
