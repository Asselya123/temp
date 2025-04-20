import { Button, Form, Input, Modal } from "antd";
import { MaskedInput } from "antd-mask-input";
import Title from "antd/es/typography/Title";
import logo from "@/assets/logo.png";
import { useCreateManagerForm } from "@/forms";
import { CustomUpload } from "../CustomUpload";

interface CreateManagerFormProps {
    visible: boolean;
    onClose: () => void;
}

const CreateManagerForm = ({ visible, onClose }: CreateManagerFormProps) => {
    const { formik } = useCreateManagerForm();
    return (
        <Modal title="Create New Manager" open={visible} onCancel={onClose} footer={null} width={600}>
            <div className="flex w-full flex-col items-center">
                <img src={logo} alt="MiniLand Logo" className="w-[100px]" />
                <Title level={4}>Create New Manager</Title>
            </div>
            <CustomUpload setLink={(link) => formik.setFieldValue("photo_url", link)} />
            <Form layout="vertical" onFinish={formik.handleSubmit} className="mt-4">
                <Form.Item
                    label="Full Name"
                    validateStatus={formik.touched.full_name && formik.errors.full_name ? "error" : ""}
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
                    validateStatus={formik.touched.phone && formik.errors.phone ? "error" : ""}
                    help={formik.touched.phone && formik.errors.phone}
                >
                    <MaskedInput
                        mask="+7 (000) 000-00-00"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter phone number"
                    />
                </Form.Item>

                <Form.Item
                    label="Username"
                    validateStatus={formik.touched.username && formik.errors.username ? "error" : ""}
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
                    validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
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
