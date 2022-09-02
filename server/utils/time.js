/**
 * date객체를 yyyy-mm-dd 형태로 만들어준다.
 */
function getFormatDate(date) {
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : `0${month}`; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : `0${day}`; //day 두자리로 저장

    return [year, month, day].join("-"); // yyyy-mm-dd
}

function getFormatDateByInterval(date, interval) {
    const monthFirstDate = new Date(date.getTime());
    monthFirstDate.setMonth(monthFirstDate.getMonth() + interval);
    return getFormatDate(monthFirstDate);
}

/**
 * { yyyy.mm: sums } 형태의 Object 구성을 위해 1년치 key 미리 설정
 * @param {*} startString 시작 시간 yyyy-mm-dd 형식의 string
 * @param {*} endString 끝 시간 yyyy-mm-dd 형식의 string
 * @returns 1년치 { yyyy.mm: sums }
 */
function getYearDates(startString, endString) {
    const startDate = new Date(startString);
    const endDate = new Date(endString);
    const yearDates = {};
    for (; startDate < endDate; startDate.setMonth(startDate.getMonth() + 1)) {
        const year = startDate.getFullYear().toString();
        const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
        const key = `${year}.${month}`;
        yearDates[key] = 0;
    }
    return yearDates;
}

module.exports = { getFormatDate, getFormatDateByInterval, getYearDates };
