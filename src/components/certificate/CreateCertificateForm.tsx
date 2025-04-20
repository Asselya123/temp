import { Button, Form, Input, Modal, Select } from "antd";
import Title from "antd/es/typography/Title";
import logo from "@/assets/logo.png";
import { useCreateCertificateForm } from "@/forms";
import { useGetPromotions } from "@/query";

interface CreateCertificateFormProps {
    visible: boolean;
    onClose: () => void;
}

const CreateCertificateForm = ({ visible, onClose }: CreateCertificateFormProps) => {
    const { formik } = useCreateCertificateForm();
    const { data: promotions } = useGetPromotions();
    return (
        <Modal title="Create New Certificate" open={visible} onCancel={onClose} footer={null} width={600}>
            <div className="flex w-full flex-col items-center">
                <img src={logo} alt="MiniLand Logo" className="w-[100px]" />
                <Title level={4}>Create New Certificate</Title>
            </div>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Form.Item
                    label="Buyer's Full Name"
                    validateStatus={formik.touched.buyer_full_name && formik.errors.buyer_full_name ? "error" : ""}
                    help={formik.touched.buyer_full_name && formik.errors.buyer_full_name}
                >
                    <Input
                        name="buyer_full_name"
                        value={formik.values.buyer_full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter full name"
                    />
                </Form.Item>

                <Form.Item
                    label="Buyer's Phone Number"
                    validateStatus={formik.touched.buyer_phone && formik.errors.buyer_phone ? "error" : ""}
                    help={formik.touched.buyer_phone && formik.errors.buyer_phone}
                >
                    <Input
                        name="buyer_phone"
                        value={formik.values.buyer_phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter phone number"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Parent's Full Name"
                    validateStatus={formik.touched.receiver_full_name && formik.errors.receiver_full_name ? "error" : ""}
                    help={formik.touched.receiver_full_name && formik.errors.receiver_full_name}
                >
                    <Input
                        name="receiver_full_name"
                        value={formik.values.receiver_full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter full name"
                    />
                </Form.Item>

                <Form.Item
                    label="Parent's Phone Number"
                    validateStatus={formik.touched.receiver_phone && formik.errors.receiver_phone ? "error" : ""}
                    help={formik.touched.receiver_phone && formik.errors.receiver_phone}
                >
                    <Input
                        name="receiver_phone"
                        value={formik.values.receiver_phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter phone number"
                    />
                </Form.Item>

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
                            label: `${promotion.name} - ${promotion.cost} ₸`,
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
                        Create Certificate
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateCertificateForm;
