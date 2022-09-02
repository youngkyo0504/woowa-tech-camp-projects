export const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const changeDateMonth = (currentDate, amount) => {
    const movedDate = new Date(currentDate.getTime());
    movedDate.setMonth(currentDate.getMonth() + amount);
    return movedDate;
};

export const getYearMonth = (currentDate) => {
    return `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
};

export const getLocaleDate = (date) => {
    const currentDate = new Date(date.replaceAll(".", "-"));
    const month = currentDate.getMonth() + 1;
    const dateNum = currentDate.getDate();
    const day = currentDate.getDay();

    return [`${month} 월 ${dateNum} 일`, DAYS[day]];
};
