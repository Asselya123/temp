import { Button, Card, Form, Input, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useCreateManagerForm } from "@/forms";
import logo from "../assets/logo.png";

interface CreateManagerFormProps {
  visible: boolean;
  onClose: () => void;
}

const CreateManagerForm = ({ visible, onClose }: CreateManagerFormProps) => {
  const { formik } = useCreateManagerForm();
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
            label="Username"
            validateStatus={
              formik.touched.username && formik.errors.username ? "error" : ""
            }
            help={formik.touched.username && formik.errors.username}
          >
            <Input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            help={formik.touched.password && formik.errors.password}
          >
            <Input.Password
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter password"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Card>
        <Card>
          <Form.Item
            label="Full Name"
            validateStatus={
              formik.touched.full_name && formik.errors.full_name ? "error" : ""
            }
            help={formik.touched.full_name && formik.errors.full_name}
          >
            <Input
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter full name"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            validateStatus={
              formik.touched.phone && formik.errors.phone ? "error" : ""
            }
            help={formik.touched.phone && formik.errors.phone}
          >
            <Input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number"
            />
          </Form.Item>
        </Card>

        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            disabled={formik.isSubmitting || !formik.isValid}
            onClick={() =>
              formik
                .submitForm()
                .then(() => formik.resetForm())
                .then(() => onClose())
            }
            loading={formik.isSubmitting}
          >
            Create Manager
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateManagerForm;
