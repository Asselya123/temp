import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Form, Input, InputNumber, Modal, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import logo from "../assets/logo.png";
import { orderService } from "../services/orderService";
import { Certificate } from "../types";

interface CreateOrderFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOrderForm = ({
  visible,
  onClose,
  onSuccess,
}: CreateOrderFormProps) => {
  const [certificateCode, setCertificateCode] = useState("");
  const [certificateVerified, setCertificateVerified] =
    useState<Certificate | null>(null);

  // Fetch available plans
  const { data: plans = [] } = useQuery({
    queryKey: ["plans"],
    queryFn: orderService.getPlans,
  });

  // Verify certificate mutation
  const verifyCertificateMutation = useMutation({
    mutationFn: orderService.verifyCertificate,
    onSuccess: (data) => {
      setCertificateVerified(data);
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      onSuccess();
      onClose();
      formik.resetForm();
      setCertificateCode("");
      setCertificateVerified(null);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      kidName: "",
      kidAge: 3,
      parentName: "",
      parentPhone: "",
      planId: "",
    },
    validationSchema: Yup.object({
      kidName: Yup.string().required("Required"),
      kidAge: Yup.number().min(1).max(12).required("Required"),
      parentName: Yup.string().required("Required"),
      parentPhone: Yup.string().required("Required"),
      planId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const now = new Date();
      const selectedPlan = plans.find((p) => p.id === values.planId);
      if (!selectedPlan) return;

      let duration = selectedPlan.duration;

      // If certificate is verified and selected, use its duration
      if (certificateVerified) {
        duration = certificateVerified.duration;
      }

      const endTime = new Date(now.getTime() + duration * 60000);

      createOrderMutation.mutate({
        promotion_name: certificateVerified?.code || "",
        child_full_name: values.kidName,
        child_age: values.kidAge,
        parent_full_name: values.parentName,
        parent_phone: values.parentPhone,
        order_type: "order_type",
        order_date: now.toISOString(),
        order_time: now.toISOString(),
        planId: selectedPlan.id,
      });
    },
  });

  // Handle certificate verification
  const handleVerifyCertificate = () => {
    if (certificateCode) {
      verifyCertificateMutation.mutate(certificateCode);
    }
  };

  return (
    <Modal
      title="Create New Order"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="flex w-full flex-col items-center">
        <img src={logo} alt="MiniLand Logo" className="w-[100px]" />
        <Title level={4}>Create New Order</Title>
      </div>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Card className="mb-4">
          <Form.Item
            label="Kid's Full Name"
            validateStatus={
              formik.touched.kidName && formik.errors.kidName ? "error" : ""
            }
            help={formik.touched.kidName && formik.errors.kidName}
          >
            <Input
              name="kidName"
              value={formik.values.kidName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter full name"
            />
          </Form.Item>

          <Form.Item
            label="Kid's Age"
            validateStatus={
              formik.touched.kidAge && formik.errors.kidAge ? "error" : ""
            }
            help={formik.touched.kidAge && formik.errors.kidAge}
          >
            <InputNumber
              name="kidAge"
              value={formik.values.kidAge}
              onChange={(value) => formik.setFieldValue("kidAge", value)}
              onBlur={formik.handleBlur}
              min={1}
              max={12}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Card>
        <Card>
          <Form.Item
            label="Parent's Full Name"
            validateStatus={
              formik.touched.parentName && formik.errors.parentName
                ? "error"
                : ""
            }
            help={formik.touched.parentName && formik.errors.parentName}
          >
            <Input
              name="parentName"
              value={formik.values.parentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter full name"
            />
          </Form.Item>

          <Form.Item
            label="Parent's Phone Number"
            validateStatus={
              formik.touched.parentPhone && formik.errors.parentPhone
                ? "error"
                : ""
            }
            help={formik.touched.parentPhone && formik.errors.parentPhone}
          >
            <Input
              name="parentPhone"
              value={formik.values.parentPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number"
            />
          </Form.Item>
        </Card>

        <Form.Item
          label="Select Plan"
          validateStatus={
            formik.touched.planId && formik.errors.planId ? "error" : ""
          }
          help={formik.touched.planId && formik.errors.planId}
        >
          <Select
            value={formik.values.planId}
            onChange={(value) => formik.setFieldValue("planId", value)}
            onBlur={formik.handleBlur}
            placeholder="Select a plan"
            options={plans.map((plan) => ({
              value: plan.id,
              label: `${plan.name} - $${plan.price}`,
            }))}
          />
        </Form.Item>

        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={createOrderMutation.isPending}
          >
            Create Order
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateOrderForm;
