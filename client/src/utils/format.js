/**
 * 숫자를 yyyy.mm.dd로 바꿔준다.
 * @param {} value
 * @returns
 */
export const formatDate = (value) => {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1.$2.$3")
        .replace(/(\.{1,2})$/g, "");
};

/**
 * date객체를 yyyymmdd로 바꾼다.
 * @param {*} date
 * @returns
 */
export function formatDateToString(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    let year = date.getFullYear();

    if (month.length < 2) {
        month = `0${month}`;
    }
    if (day.length < 2) {
        day = `0${day}`;
    }
    return [year, month, day].join("");
}

/**
 * input value를 원 단위로 포멧팀 한다.
 * @param {*} value
 * @returns 1,000,000
 */
export const formatAmount = (value) => {
    if (!value) {
        return "";
    }
    const minus = value < 0 ? "-" : "";
    value = String(value);
    const digitString = value.replace(/[^0-9]/g, "");
    const formattedAmount = digitString ? Number(digitString).toLocaleString() : "";

    return `${minus}${formattedAmount}`;
};
