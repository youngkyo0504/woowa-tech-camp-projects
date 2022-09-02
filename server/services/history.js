const HistoryModel = require("../models/history");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/format");
const { getFormatDate, getFormatDateByInterval, getYearDates } = require("../utils/time");

module.exports = (function HistoryService() {
    async function addHistory(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const id = await HistoryModel.create({ data });
        return {
            ...pureData,
            id,
        };
    }

    async function getHistoryByMonth(date) {
        const startDate = `${date}.01`.replaceAll(".", "-");
        const endDate = getFormatDateByInterval(new Date(startDate), 1);

        const dbResults = await HistoryModel.findByRange({
            startDate,
            endDate,
        });

        const histories = dbResults.map(formatPropertyToCamel);
        return histories;
    }

    async function editHistory(id, body) {
        const data = formatPropertyToSnake(body);

        await HistoryModel.updateById({ id, data });

        const pureHistory = await HistoryModel.findById({ id });
        const history = formatPropertyToCamel(pureHistory);
        return {
            ...history,
            date: getFormatDate(history.date).replaceAll("-", "."),
        };
    }

    async function deleteHistory(id) {
        return await HistoryModel.deleteById({ id });
    }

    async function getHistoryRecentSum(categoryId, date) {
        const currentDate = new Date(`${date}.01`.replaceAll(".", "-"));

        const startDate = getFormatDateByInterval(currentDate, -6);
        const endDate = getFormatDateByInterval(currentDate, 6);

        const dbResults = await HistoryModel.sumAmountsByMonth({ categoryId, startDate, endDate });
        const yearSums = getYearDates(startDate, endDate);
        const sums = dbResults.reduce((acc, { date, total }) => {
            yearSums[date] = total;
            return acc;
        }, yearSums);
        return sums;
    }

    async function getExpenditureByCategory(categoryId, date) {
        const startDate = `${date}.01`.replaceAll(".", "-");
        const endDate = getFormatDateByInterval(new Date(startDate), 1);

        const dbResults = await HistoryModel.findByRangeAndCategory({
            categoryId,
            startDate,
            endDate,
        });
        const histories = dbResults.map(formatPropertyToCamel);
        return histories;
    }

    return {
        addHistory,
        editHistory,
        deleteHistory,
        getHistoryByMonth,
        getHistoryRecentSum,
        getExpenditureByCategory,
    };
})();
