import { makeObservable, subscribe } from "@core/Observer";
import { getRecentSumsByCategory } from "@apis/history";
import { getYearMonth } from "@utils/date";
import controlDate from "@store/controlDate";

const state = makeObservable({
    value: {},
    isLoading: true,
    category: 0,
});

function clearData() {
    state.isLoading = true;
    state.value = {};
    state.category = 0;
    return true;
}
subscribe(controlDate.state, clearData);

async function fetchData({ category }) {
    clearData();
    state.category = category;

    const currentDate = controlDate.state.value;
    const dateString = getYearMonth(currentDate);

    const { statistics } = await getRecentSumsByCategory({
        query: { date: dateString, category },
    });

    state.value = statistics;
    state.isLoading = false;
}

export default {
    state,
    fetchData,
};
