import { formatDate, formatDateToString } from "@utils/format";
import { makeObservable } from "@core/Observer";
import { changeDateMonth } from "@utils/date";

const state = makeObservable({
    value: new Date(),
});

const movePrev = () => {
    state.value = changeDateMonth(state.value, -1);
};
const moveNext = () => {
    state.value = changeDateMonth(state.value, +1);
};

const getFormattedDate = () => {
    const date = state.value;
    const yyyymmdd = formatDateToString(date);
    return formatDate(yyyymmdd);
};

export default {
    state,
    movePrev,
    moveNext,
    getFormattedDate,
};
