import { Form, Input } from "antd";
import { useUpdateManagerForm } from "@/forms";
import { ManagerResponse } from "@/types";

interface ManagerCardProps {
  manager: ManagerResponse;
}

const ManagerCard = ({ manager }: ManagerCardProps) => {
  const { formik } = useUpdateManagerForm(manager);
  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <div className="flex items-center gap-2">
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
      </div>
      <div className="flex items-center gap-2">
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
      </div>
    </Form>
  );
};

export default ManagerCard;
