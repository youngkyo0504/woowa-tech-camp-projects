import request from "@utils/request";

export const getHistoriesByMonth = async ({ query }) => {
    const data = await request.get({ url: `/history`, query });
    return data;
};

export const getRecentSumsByCategory = async ({ query }) => {
    const data = await request.get({ url: `/history/statistic`, query });
    return data;
};

export const getExpendituresByCategory = async ({ query }) => {
    const data = await request.get({ url: `/history/expenditure`, query });
    return data;
};
