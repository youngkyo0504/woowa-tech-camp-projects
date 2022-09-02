import { makeObservable } from "@core/Observer";

const state = makeObservable({
    isHistoriesLoading: true,
    isCategoriesLoading: true,
    isPaymentMethodsLoading: true,
});

const isLoading = () => {
    return !Object.values(state).every((isLoading) => !isLoading);
};

export default {
    state,
    isLoading,
};
