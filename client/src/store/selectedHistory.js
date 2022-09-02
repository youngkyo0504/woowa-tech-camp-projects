import { makeObservable } from "@core/Observer";
import histories from "@store/histories";
import controlDate from "./controlDate";

export const state = makeObservable({
    date: controlDate.getFormattedDate(),
    content: null,
    paymentMethod: null,
    amount: null,
    category: null,
    id: null,
    isIncome: null,
    isChanged: false,
});

export const resetHistoryState = () => {
    state.date = controlDate.getFormattedDate();
    state.content = null;
    state.paymentMethod = null;
    state.amount = null;
    state.category = null;
    state.id = null;
    state.isIncome = null;
    state.isChanged = true;
};

export const selectHistoryState = (historyId) => {
    if (historyId == state.id) {
        return resetHistoryState();
    }

    const history = histories.state.details.find(({ id }) => id == historyId);
    if (!history) {
        return;
    }

    Object.entries(history).forEach(([key, value]) => (state[key] = value));
    state.isChanged = true;
};

export default { state, resetHistoryState, selectHistoryState };
