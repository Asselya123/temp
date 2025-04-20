import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useCreatePromotionForm } from "@/forms";

interface CreatePromotionFormProps {
    visible: boolean;
    onClose: () => void;
}

export const CreatePromotionForm = ({ visible, onClose }: CreatePromotionFormProps) => {
    const { formik } = useCreatePromotionForm();

    return (
        <Modal title="Create New Promotion" open={visible} onCancel={onClose} footer={null} width={400} destroyOnClose>
            <Form layout="vertical" onFinish={formik.handleSubmit} className="flex flex-col">
                <Form.Item
                    label="Promotion Name"
                    validateStatus={formik.touched.name && formik.errors.name ? "error" : ""}
                    help={formik.touched.name && formik.errors.name}
                >
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter promotion name"
                    />
                </Form.Item>

                <Form.Item
                    label="Cost"
                    validateStatus={formik.touched.cost && formik.errors.cost ? "error" : ""}
                    help={formik.touched.cost && formik.errors.cost}
                >
                    <InputNumber
                        name="cost"
                        value={formik.values.cost}
                        onChange={(value) => formik.setFieldValue("cost", value)}
                        onBlur={formik.handleBlur}
                        placeholder="Enter cost"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Duration"
                    validateStatus={formik.touched.duration && formik.errors.duration ? "error" : ""}
                    help={formik.touched.duration && formik.errors.duration}
                >
                    <InputNumber
                        name="duration"
                        value={formik.values.duration}
                        onChange={(value) => formik.setFieldValue("duration", value)}
                        onBlur={formik.handleBlur}
                        placeholder="Enter duration"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Penalty per minute"
                    validateStatus={formik.touched.penalty && formik.errors.penalty ? "error" : ""}
                    help={formik.touched.penalty && formik.errors.penalty}
                >
                    <InputNumber
                        name="penalty"
                        value={formik.values.penalty}
                        onChange={(value) => formik.setFieldValue("penalty", value)}
                        onBlur={formik.handleBlur}
                        placeholder="Enter penalty per minute"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

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
                    className="mb-6"
                >
                    Create Certificate
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </Form>
        </Modal>
    );
};
