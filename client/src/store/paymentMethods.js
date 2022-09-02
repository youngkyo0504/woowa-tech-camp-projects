import { makeObservable } from "@core/Observer";
import { getAllPaymentMethod } from "@apis/paymentMethodApi";
import loader from "@store/loader";

const state = makeObservable({
    value: {},
});

const fetchData = async () => {
    loader.state.isPaymentMethodsLoading = true;
    const { paymentMethods } = await getAllPaymentMethod();
    state.value = paymentMethods;
    loader.state.isPaymentMethodsLoading = false;
};

const getPaymentMethodById = (id) => {
    const { value } = state;
    if (id === null) {
        return undefined;
    }
    const paymentMethod = value[id];
    return (paymentMethod || {}).name;
};

const getPaymentMethodIds = () => {
    const { value } = state;
    return Object.keys(value);
};

const paymentMethodsUpdate = (newPaymentMethod) => {
    delete state.value[newPaymentMethod.id];
    state.value = { [newPaymentMethod.id]: newPaymentMethod, ...state.value };
};

const paymentMethodsDelete = (newPaymentMethodId) => {
    const newPaymentMethods = { ...state.value };
    delete newPaymentMethods[newPaymentMethodId];
    state.value = { ...newPaymentMethods };
};

async function initPaymentMethods() {
    await fetchData();
}
initPaymentMethods();

export default {
    fetchData,
    state,
    getPaymentMethodIds,
    getPaymentMethodById,
    paymentMethodsUpdate,
    paymentMethodsDelete,
};
