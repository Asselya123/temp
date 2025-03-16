import { useState } from 'react';
import { Typography, Button, Table, Tag, Modal, Form, Input, InputNumber, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import { Certificate } from '../types';
import { formatDate } from '../utils/dateUtils';
import dayjs from 'dayjs';

const { Title } = Typography;

const CertificatesPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const queryClient = useQueryClient();
  
  // Fetch certificates
  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: orderService.getCertificates,
  });
  
  // Create certificate mutation
  const createCertificateMutation = useMutation({
    mutationFn: (values: { code: string; duration: number; expiryDate: Date }) => 
      orderService.createCertificate(values.code, values.duration, values.expiryDate),
    onSuccess: () => {
      message.success('Certificate created successfully');
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      setIsModalVisible(false);
      form.resetFields();
    },
    onError: () => {
      message.error('Failed to create certificate');
    },
  });
  
  // Handle form submission
  const handleSubmit = (values: { code: string; duration: number; expiryDate: dayjs.Dayjs }) => {
    createCertificateMutation.mutate({
      code: values.code,
      duration: values.duration,
      expiryDate: values.expiryDate.toDate(),
    });
  };
  
  // Table columns
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} minutes`,
    },
    {
      title: 'Status',
      dataIndex: 'isUsed',
      key: 'isUsed',
      render: (isUsed: boolean) => (
        isUsed 
          ? <Tag color="red">Used</Tag> 
          : <Tag color="green">Available</Tag>
      ),
    },
    {
      title: 'Issued Date',
      dataIndex: 'issuedAt',
      key: 'issuedAt',
      render: (date: Date) => formatDate(date),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (date: Date) => formatDate(date),
    },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">Certificates</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalVisible(true)}
        >
          Create Certificate
        </Button>
      </div>
      
      <Table 
        dataSource={certificates} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
      />
      
      <Modal
        title="Create Certificate"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="code"
            label="Certificate Code"
            rules={[{ required: true, message: 'Please enter certificate code' }]}
          >
            <Input placeholder="e.g., SUMMER2025" />
          </Form.Item>
          
          <Form.Item
            name="duration"
            label="Duration (minutes)"
            rules={[{ required: true, message: 'Please enter duration' }]}
          >
            <InputNumber min={30} step={30} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true, message: 'Please select expiry date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={createCertificateMutation.isPending}
            >
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CertificatesPage;