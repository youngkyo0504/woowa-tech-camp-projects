import request from "@utils/request";

export async function getAllPaymentMethod() {
    return await request.get({ url: "/payment-method" });
}

export async function addPaymentMethod(name) {
    return await request.post({ url: "/payment-method", body: { name } });
}

export async function deletePaymentMethod(id) {
    return await request.delete({ url: `/payment-method/${id}` });
}
