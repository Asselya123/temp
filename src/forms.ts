import { useFormik } from "formik";
import * as Yup from "yup";
import {
    useCreateCertificateMutation,
    useCreateManagerMutation,
    useCreateOrderMutation,
    useCreatePromotionMutation,
    useLoginMutation,
    useUseCertificateMutation,
} from "./query";
import { Certificate, LoginRequest, Manager, ManagerResponseItem, Order, Promotion, UseCertificateRequest } from "./types";

const requiredStringSchema = () => Yup.string().required("This field is required");
const requiredNumberSchema = () => Yup.number().required("This field is required");

const loginSchema = Yup.object().shape({
    username: requiredStringSchema(),
    password: requiredStringSchema(),
});

const orderSchema = Yup.object().shape({
    promotion_name: requiredStringSchema(),
    order_type: requiredStringSchema(),
    child_full_name: requiredStringSchema(),
    child_age: requiredNumberSchema(),
    parent_full_name: requiredStringSchema(),
    parent_phone: requiredStringSchema(),
});

const certificateSchema = Yup.object().shape({
    buyer_full_name: requiredStringSchema(),
    buyer_phone: requiredStringSchema(),
    receiver_full_name: requiredStringSchema(),
    receiver_phone: requiredStringSchema(),
    promotion_name: requiredStringSchema(),
});

const useCertificateSchema = Yup.object().shape({
    certificate_id: requiredNumberSchema(),
    attrs: Yup.object().shape({
        order_type: requiredStringSchema(),
        promotion_name: requiredStringSchema(),
        child_full_name: requiredStringSchema(),
        child_age: requiredNumberSchema(),
        parent_full_name: requiredStringSchema(),
        parent_phone: requiredStringSchema(),
    }),
});

const promotionSchema = Yup.object().shape({
    name: requiredStringSchema(),
    cost: requiredNumberSchema(),
    duration: requiredNumberSchema(),
    penalty: requiredNumberSchema(),
});

const managerSchema = Yup.object().shape({
    username: requiredStringSchema(),
    password: requiredStringSchema(),
    phone: requiredStringSchema(),
    full_name: requiredStringSchema(),
    photo_url: requiredStringSchema(),
});

export const useLoginForm = () => {
    const mutation = useLoginMutation();

    const formik = useFormik<LoginRequest>({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: LoginRequest) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};

export const useCreateOrderForm = () => {
    const mutation = useCreateOrderMutation();

    const formik = useFormik<Order>({
        initialValues: {
            promotion_name: "",
            order_type: "default",
            child_full_name: "",
            child_age: undefined as any,
            parent_full_name: "",
            parent_phone: "",
        },
        validationSchema: orderSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: Order) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};

export const useCreateCertificateForm = () => {
    const mutation = useCreateCertificateMutation();

    const formik = useFormik<Certificate>({
        initialValues: {
            buyer_full_name: "",
            buyer_phone: "",
            receiver_full_name: "",
            receiver_phone: "",
            promotion_name: "",
            valid_until: "",
            cost: 0,
        },
        validationSchema: certificateSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: Certificate) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};

export const useUseCertificateForm = (initialValues: UseCertificateRequest) => {
    const mutation = useUseCertificateMutation();

    const formik = useFormik<UseCertificateRequest>({
        initialValues: {
            certificate_id: initialValues.certificate_id,
            attrs: {
                order_type: initialValues.attrs.order_type,
                promotion_name: initialValues.attrs.promotion_name,
                child_full_name: initialValues.attrs.child_full_name,
                child_age: initialValues.attrs.child_age,
                parent_full_name: initialValues.attrs.parent_full_name,
                parent_phone: initialValues.attrs.parent_phone,
            },
        },
        validationSchema: useCertificateSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: UseCertificateRequest) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};

export const useCreatePromotionForm = () => {
    const mutation = useCreatePromotionMutation();

    const formik = useFormik<Promotion>({
        initialValues: {
            name: "",
            cost: 0,
            duration: 0,
            penalty: 0,
        },
        validationSchema: promotionSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: Promotion) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};

export const useCreateManagerForm = () => {
    const mutation = useCreateManagerMutation();

    const formik = useFormik<Manager>({
        initialValues: {
            username: "",
            password: "",
            phone: "",
            full_name: "",
            photo_url: "",
            hired_date: "",
            fired_date: "",
        },
        validationSchema: managerSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: Manager) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};

export const useUpdateManagerForm = (initialValues: ManagerResponseItem) => {
    const mutation = useCreateManagerMutation();

    const formik = useFormik<ManagerResponseItem>({
        initialValues,
        validationSchema: managerSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: Manager) {
        await mutation.mutateAsync(values);
    }

    return { formik, mutation };
};
