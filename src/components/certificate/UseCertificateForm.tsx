import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import Title from "antd/es/typography/Title";
import logo from "@/assets/logo.png";
import { useUseCertificateForm } from "@/forms";
import { useGetPromotions } from "@/query";
import { CertificateResponseItem } from "@/types";

interface UseCertificateFormProps {
    visible: boolean;
    onClose: () => void;
    certificate: CertificateResponseItem;
}

export const UseCertificateForm = ({ visible, onClose, certificate }: UseCertificateFormProps) => {
    const { formik } = useUseCertificateForm({
        certificate_id: Number(certificate.id),
        attrs: {
            order_type: "use",
            promotion_name: certificate.promotion_name,
            child_full_name: "",
            child_age: 0,
            parent_full_name: certificate.receiver_full_name,
            parent_phone: certificate.receiver_phone,
        },
    });
    const { data: promotions } = useGetPromotions();
    return (
        <Modal open={visible} onCancel={onClose} footer={null} width={600}>
            <div className="flex w-full flex-col items-center">
                <img src={logo} alt="MiniLand Logo" className="w-[100px]" />
                <Title level={4}>Use Certificate</Title>
            </div>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Form.Item label="Parent's Full Name">
                    <Input
                        name="attrs.parent_full_name"
                        value={formik.values.attrs.parent_full_name}
                        onBlur={formik.handleBlur}
                        placeholder="Enter full name"
                        disabled
                    />
                </Form.Item>

                <Form.Item label="Parent's Phone Number">
                    <Input
                        name="attrs.parent_phone"
                        value={formik.values.attrs.parent_phone}
                        onBlur={formik.handleBlur}
                        placeholder="Enter phone number"
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    label="Kid's Full Name"
                    validateStatus={formik.touched.attrs?.child_full_name && formik.errors.attrs?.child_full_name ? "error" : ""}
                    help={formik.touched.attrs?.child_full_name && formik.errors.attrs?.child_full_name}
                >
                    <Input
                        name="attrs.child_full_name"
                        value={formik.values.attrs.child_full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter full name"
                    />
                </Form.Item>

                <Form.Item
                    label="Kid's Age"
                    validateStatus={formik.touched.attrs?.child_age && formik.errors.attrs?.child_age ? "error" : ""}
                    help={formik.touched.attrs?.child_age && formik.errors.attrs?.child_age}
                >
                    <InputNumber
                        type="number"
                        name="attrs.child_age"
                        value={formik.values.attrs.child_age}
                        onChange={(value) => formik.setFieldValue("attrs.child_age", value)}
                        onBlur={formik.handleBlur}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Select Plan"
                    validateStatus={formik.touched.attrs?.promotion_name && formik.errors.attrs?.promotion_name ? "error" : ""}
                    help={formik.touched.attrs?.promotion_name && formik.errors.attrs?.promotion_name}
                >
                    <Select
                        value={formik.values.attrs.promotion_name}
                        onBlur={formik.handleBlur}
                        placeholder="Select a plan"
                        options={promotions?.map((promotion) => ({
                            value: promotion.name,
                            label: `${promotion.name} - $${promotion.cost}`,
                        }))}
                        disabled
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
