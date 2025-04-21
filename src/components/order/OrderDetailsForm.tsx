import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import Title from "antd/es/typography/Title";
import logo from "@/assets/logo.png";
import { useFinishOrderMutation, useGetPromotions } from "@/query";
import { OrderResponseItem } from "@/types";
import { getTimeDifferenceInMinutes } from "@/utils";

interface OrderDetailsFormProps {
    visible: boolean;
    onClose: () => void;
    order: OrderResponseItem;
}

export const OrderDetailsForm = ({ visible, onClose, order }: OrderDetailsFormProps) => {
    const { data: promotions } = useGetPromotions();
    const { mutateAsync: finishOrder } = useFinishOrderMutation();
    return (
        <Modal title={`${order.child_full_name}`} open={visible} destroyOnClose onCancel={onClose} footer={null} width={600}>
            <div className="flex w-full flex-col items-center">
                <img src={logo} alt="MiniLand Logo" className="w-[100px]" />
                <Title level={4}>Order Details</Title>
            </div>
            <Form layout="vertical" className="flex flex-col">
                <Form.Item label="Parent's Full Name">
                    <Input name="parent_full_name" value={order.parent_full_name} placeholder="Enter full name" />
                </Form.Item>

                <Form.Item label="Parent's Phone Number">
                    <MaskedInput
                        mask="+7 (000) 000-00-00"
                        name="parent_phone"
                        value={order.parent_phone}
                        placeholder="Enter phone number"
                    />
                </Form.Item>

                <Form.Item label="Kid's Full Name">
                    <Input name="child_full_name" value={order.child_full_name} placeholder="Enter full name" />
                </Form.Item>

                <Form.Item label="Kid's Age">
                    <InputNumber name="child_age" value={order.child_age} type="number" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Select Plan">
                    <Select
                        value={order.promotion_name}
                        placeholder="Select a plan"
                        options={promotions?.map((promotion) => ({
                            value: promotion.name,
                            label: `${promotion.name} - ${promotion.cost} ₸`,
                        }))}
                    />
                </Form.Item>
                <div className="mb-4 flex flex-col gap-2 text-base">
                    <div>
                        <b>Time left:</b> {getTimeDifferenceInMinutes(new Date())}
                    </div>
                    <div>
                        <b>Total Price:</b> {order.penalty * getTimeDifferenceInMinutes(new Date(order.end_time)) + order.cost} ₸
                    </div>
                </div>
                {order.status === "active" && (
                    <>
                        <Popconfirm
                            title="Are you sure you want to finish this order?"
                            onConfirm={async () => {
                                await finishOrder(order.id);
                                onClose();
                            }}
                        >
                            <Button type="primary" size="large" danger className="mb-4">
                                Complete Order
                            </Button>
                        </Popconfirm>
                        <Button
                            size="large"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </Form>
        </Modal>
    );
};
