import { DollarCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, DatePicker, Statistic } from "antd";
import Table, { ColumnType } from "antd/es/table";
import { useState } from "react";
import { useGetStatistics } from "@/query";
import { Statistics } from "@/types";

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
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();

    const { data, isLoading } = useGetStatistics({ startDate, endDate });
    return (
        <div>
            <div className="flex items-center justify-center gap-4">
                <Card type="inner" className="w-1/2">
                    <Statistic
                        title="Total Earnings"
                        value={data?.data.reduce((acc, curr) => acc + curr.statistics.total_earnings, 0)}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<DollarCircleOutlined />}
                        suffix="₸"
                    />
                </Card>
                <Card type="inner" className="w-1/2">
                    <Statistic
                        title="Total Orders"
                        valueStyle={{ color: "#1890ff" }}
                        prefix={<ShoppingOutlined />}
                        value={data?.data.reduce((acc, curr) => acc + curr.statistics.total_orders, 0)}
                    />
                </Card>
            </div>
            <div className="mb-8 mt-4 flex items-center justify-center gap-4">
                <DatePicker.RangePicker
                    size="large"
                    onChange={(dates) => {
                        setStartDate(dates?.[0].toISOString());
                        setEndDate(dates?.[1].toISOString());
                    }}
                />
            </div>
            <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey={(record) => record.manager.id} />
        </div>
    );
};
