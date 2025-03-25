import {
  ClockCircleOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, Typography } from "antd";
import { OrderResponse } from "../types";
import {
  formatTimeDifference,
  getTimeDifferenceInMinutes,
} from "../utils/dateUtils";

const { Text, Title } = Typography;

interface OrderCardProps {
  order: OrderResponse;
  onMarkComplete?: (id: string) => void;
}

const OrderCard = ({ order, onMarkComplete }: OrderCardProps) => {
  const timeLeft = getTimeDifferenceInMinutes(
    new Date(order.order_date + " " + order.order_time),
  );

  // Determine card border color based on status and time left
  let borderColorClass = "border-gray-200";

  if (order.status === "completed") {
    borderColorClass = "border-green-500";
  } else if (order.status === "expired" || timeLeft < 0) {
    borderColorClass = "border-red-500";
  } else if (order.status === "active") {
    borderColorClass = "border-orange-400";
  }

  // Format the time status text
  let timeStatusText = "";
  if (order.status === "completed") {
    timeStatusText = "Completed";
  } else if (order.status === "expired" || timeLeft < 0) {
    timeStatusText = formatTimeDifference(timeLeft);
  } else {
    timeStatusText = formatTimeDifference(timeLeft);
  }

  return (
    <Card
      className={`w-full border-2 ${borderColorClass} transition-shadow hover:shadow-md`}
      actions={
        order.status === "active"
          ? [
              <Button
                type="primary"
                onClick={() => onMarkComplete?.(order.id.toString())}
              >
                Mark as completed
              </Button>,
            ]
          : undefined
      }
    >
      <div className="flex flex-col gap-2">
        <Title level={4} className="m-0">
          {order.child_full_name}
        </Title>

        <div className="flex items-center gap-1">
          <ClockCircleOutlined />
          <Text>{timeStatusText}</Text>
        </div>

        <div className="flex items-center gap-1">
          <UserOutlined />
          <Text>{order.parent_full_name}</Text>
        </div>

        <div className="flex items-center gap-1">
          <PhoneOutlined />
          <Text>{order.parent_phone}</Text>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <Tag color="blue">Age: {order.child_age}</Tag>
          <Tag color="purple">Plan: {order.promotion_name}</Tag>
          <Tag color="cyan">Start: {order.order_date}</Tag>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
