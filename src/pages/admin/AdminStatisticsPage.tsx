import { DollarCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, DatePicker, Statistic } from "antd";
import Table, { ColumnType } from "antd/es/table";
import { getStatistics } from "@/axios";
import { Statistics } from "@/types";

const useGetStatistics = () => {
    return useQuery({
        queryKey: ["statistics"],
        queryFn: getStatistics,
    });
};

const columns: ColumnType<Statistics>[] = [
    {
        title: "Manager",
        key: "manager",
        render: (_, record) => record.manager.full_name,
    },
    {
        title: "Earnings",
        key: "total_earnings",
        render: (_, record) => record.statistics.total_earnings,
    },
    {
        title: "Orders",
        key: "total_orders",
        render: (_, record) => record.statistics.total_orders,
    },
    {
        title: "Status",
        key: "status",
        render: (_, record) => record.manager.status,
    },
];
export const AdminStatisticsPage = () => {
    const { data, isLoading } = useGetStatistics();
    return (
        <div>
            <div className="flex gap-4">
                <Card type="inner">
                    <Statistic
                        title="Total Earnings"
                        value={data?.data.reduce((acc, curr) => acc + curr.statistics.total_earnings, 0)}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<DollarCircleOutlined />}
                        suffix="₸"
                    />
                </Card>
                <Card type="inner">
                    <Statistic
                        title="Total Orders"
                        valueStyle={{ color: "#1890ff" }}
                        prefix={<ShoppingOutlined />}
                        value={data?.data.reduce((acc, curr) => acc + curr.statistics.total_orders, 0)}
                    />
                </Card>
            </div>
            <div>
                <DatePicker.RangePicker />
            </div>
            <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey="id" />
        </div>
    );
};
