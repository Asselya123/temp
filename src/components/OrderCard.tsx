import { Card, Tag, Typography, Button } from 'antd';
import { Order } from '../types';
import { formatDate, getTimeDifferenceInMinutes, formatTimeDifference } from '../utils/dateUtils';
import { PhoneOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface OrderCardProps {
  order: Order;
  onMarkComplete?: (id: string) => void;
}

const OrderCard = ({ order, onMarkComplete }: OrderCardProps) => {
  const timeLeft = getTimeDifferenceInMinutes(order.endTime);
  
  // Determine card border color based on status and time left
  let borderColorClass = 'border-gray-200';
  
  if (order.status === 'completed') {
    borderColorClass = 'border-green-500';
  } else if (order.status === 'expired' || timeLeft < 0) {
    borderColorClass = 'border-red-500';
  } else if (order.status === 'active') {
    borderColorClass = 'border-orange-400';
  }
  
  // Format the time status text
  let timeStatusText = '';
  if (order.status === 'completed') {
    timeStatusText = 'Completed';
  } else if (order.status === 'expired' || timeLeft < 0) {
    timeStatusText = formatTimeDifference(timeLeft);
  } else {
    timeStatusText = formatTimeDifference(timeLeft);
  }
  
  return (
    <Card 
      className={`w-full border-2 ${borderColorClass} hover:shadow-md transition-shadow`}
      actions={order.status === 'active' ? [
        <Button 
          type="primary" 
          onClick={() => onMarkComplete?.(order.id)}
        >
          Mark as completed
        </Button>
      ] : undefined}
    >
      <div className="flex flex-col gap-2">
        <Title level={4} className="m-0">{order.kidName}</Title>
        
        <div className="flex items-center gap-1">
          <ClockCircleOutlined />
          <Text>
            {timeStatusText}
          </Text>
        </div>
        
        <div className="flex items-center gap-1">
          <UserOutlined />
          <Text>{order.parentName}</Text>
        </div>
        
        <div className="flex items-center gap-1">
          <PhoneOutlined />
          <Text>{order.parentPhone}</Text>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <Tag color="blue">Age: {order.kidAge}</Tag>
          <Tag color="purple">Plan: {order.plan.name}</Tag>
          <Tag color="cyan">Start: {formatDate(order.startTime)}</Tag>
          {order.certificate && (
            <Tag color="green">Certificate: {order.certificate.code}</Tag>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;