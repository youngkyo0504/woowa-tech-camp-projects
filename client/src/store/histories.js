import { makeObservable, subscribe } from "@core/Observer";
import { getHistoriesByMonth } from "@apis/history";
import controlDate from "@store/controlDate";
import { getYearMonth } from "@utils/date";
import loader from "@store/loader";
import categories from "./categories";

const state = makeObservable({
    details: [],
});

async function initState() {
    state.details = [];
    loader.state.isHistoriesLoading = true;

    const currentDate = controlDate.state.value;
    const dateString = getYearMonth(currentDate);

    const { histories } = await getHistoriesByMonth({ query: { date: dateString } });
    state.details = histories;
    loader.state.isHistoriesLoading = false;
}

subscribe(controlDate.state, initState);
initState();

const getFilteredHistories = ({ isIncomeSelected, isPaidSelected }) => {
    return state.details.filter(({ isIncome }) => {
        const renderIncome = isIncomeSelected && isIncome;
        const renderPaid = isPaidSelected && !isIncome;
        return renderIncome || renderPaid;
    });
};

const getTotals = () => {
    return state.details.reduce(
        ([inTotal, outTotal], { isIncome, amount }) => {
            const numberAmount = Number(amount);
            const income = isIncome ? numberAmount : 0;
            const paid = isIncome ? 0 : numberAmount;
            return [inTotal + income, outTotal + paid];
        },
        [0, 0],
    );
};

/**
 * 일 별로 나누어서 렌더링 하기 위한 key : value 변환 작업
 * @param {*} array History 데이터 들의 집합
 * @returns {*} Object 형식으로 key를 date로 value로 array 집합을 나타냄
 */
const groupHistoriesByDate = (array) => {
    return array.reduce((returnObj, targetObj) => {
        // ex) Date Object to 2022.07.18
        const { date: stringDate, isIncome, amount } = targetObj;

        if (!returnObj[stringDate]) {
            returnObj[stringDate] = {
                incomeTotal: 0,
                paidTotal: 0,
                histories: [],
            };
        }

        const dateObj = returnObj[stringDate];
        dateObj.histories.push({ ...targetObj, date: stringDate });
        dateObj.incomeTotal += isIncome ? amount : 0;
        dateObj.paidTotal += isIncome ? 0 : amount;
        return returnObj;
    }, {});
};

const groupPaymentSumByCategory = () => {
    const categoryList = categories.state.value;

    const historyMapTemplate = Object.entries(categoryList).reduce((returnObj, [id, category]) => {
        if (category["isIncome"] === 0) {
            returnObj[id] = 0;
        }
        return returnObj;
    }, {});

    const historyMap = state.details
        .filter((detail) => detail.isIncome === 0)
        .reduce((historySumMap, history) => {
            const { category, amount } = history;
            if (category in historySumMap) {
                historySumMap[category] += amount;
            } else {
                historySumMap[category] = amount;
            }
            return historySumMap;
        }, historyMapTemplate);

    const sortedPayment = Object.entries(historyMap).sort(
        ([keyA, sumA], [keyB, sumB]) => sumB - sumA,
    );

    return sortedPayment;
};

const historiesUpdate = (newHistory) => {
    const newHistories = state.details.filter(({ id }) => newHistory.id !== id);
    state.details = [newHistory, ...newHistories];
};

export default {
    state,
    getFilteredHistories,
    getTotals,
    groupHistoriesByDate,
    groupPaymentSumByCategory,
    historiesUpdate,
};
