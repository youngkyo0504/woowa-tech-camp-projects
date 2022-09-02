import { makeObservable, subscribe } from "@core/Observer";
import { getExpendituresByCategory } from "@apis/history";
import { getYearMonth } from "@utils/date";
import controlDate from "./controlDate";

const state = makeObservable({
    value: {},
    isLoading: true,
});

function clearData() {
    state.isLoading = true;
    state.value = {};
    return true;
}
subscribe(controlDate.state, clearData);

async function fetchData({ category, date }) {
    clearData();

    const currentDate = new Date(date.replaceAll(".", "-"));
    const dateString = getYearMonth(currentDate);

    const { histories } = await getExpendituresByCategory({
        query: { date: dateString, category },
    });
    state.value = histories;
    state.isLoading = false;
}

export default {
    state,
    fetchData,
};
