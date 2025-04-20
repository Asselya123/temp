import { Button, Card, Form, Input, InputNumber, Modal, Select } from "antd";
import Title from "antd/es/typography/Title";
import logo from "@/assets/logo.png";
import { useCreateOrderForm } from "@/forms";
import { useGetPromotions } from "@/query";

interface CreateOrderFormProps {
    visible: boolean;
    onClose: () => void;
}

const CreateOrderForm = ({ visible, onClose }: CreateOrderFormProps) => {
    const { formik } = useCreateOrderForm();
    const { data: promotions } = useGetPromotions();
    return (
        <Modal title="Create New Order" open={visible} onCancel={onClose} footer={null} width={600}>
            <div className="flex w-full flex-col items-center">
                <img src={logo} alt="MiniLand Logo" className="w-[100px]" />
                <Title level={4}>Create New Order</Title>
            </div>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Card className="mb-4">
                    <Form.Item
                        label="Kid's Full Name"
                        validateStatus={formik.touched.child_full_name && formik.errors.child_full_name ? "error" : ""}
                        help={formik.touched.child_full_name && formik.errors.child_full_name}
                    >
                        <Input
                            name="child_full_name"
                            value={formik.values.child_full_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter full name"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Kid's Age"
                        validateStatus={formik.touched.child_age && formik.errors.child_age ? "error" : ""}
                        help={formik.touched.child_age && formik.errors.child_age}
                    >
                        <InputNumber
                            name="child_age"
                            value={formik.values.child_age}
                            onChange={(value) => formik.setFieldValue("child_age", value)}
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
                        validateStatus={formik.touched.parent_full_name && formik.errors.parent_full_name ? "error" : ""}
                        help={formik.touched.parent_full_name && formik.errors.parent_full_name}
                    >
                        <Input
                            name="parent_full_name"
                            value={formik.values.parent_full_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter full name"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Parent's Phone Number"
                        validateStatus={formik.touched.parent_phone && formik.errors.parent_phone ? "error" : ""}
                        help={formik.touched.parent_phone && formik.errors.parent_phone}
                    >
                        <Input
                            name="parent_phone"
                            value={formik.values.parent_phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter phone number"
                        />
                    </Form.Item>
                </Card>

                <Form.Item
                    label="Select Plan"
                    validateStatus={formik.touched.promotion_name && formik.errors.promotion_name ? "error" : ""}
                    help={formik.touched.promotion_name && formik.errors.promotion_name}
                >
                    <Select
                        value={formik.values.promotion_name}
                        onChange={(value) => formik.setFieldValue("promotion_name", value)}
                        onBlur={formik.handleBlur}
                        placeholder="Select a plan"
                        options={promotions?.map((promotion) => ({
                            value: promotion.name,
                            label: `${promotion.name} - $${promotion.cost}`,
                        }))}
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
                        Create Order
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateOrderForm;
