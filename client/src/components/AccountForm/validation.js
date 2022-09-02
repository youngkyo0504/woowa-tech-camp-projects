import paymentMethods from "@store/paymentMethods";
import { formatDateToString } from "@utils/format";

const CONTENT_MAX_LENGTH = 150;

/**
 * yyyy.mm.dd 형태의 string이 실제 date와 같은지 알려준다.
 * @param {} value
 * @returns
 */
export const validateDate = (value) => {
    const dateRegex = /^(\d{4})\.(\d{2})\.(\d{2})$/g;
    const yyyymmdd = value.replace(/\./g, "");

    const y = yyyymmdd.substr(0, 4);
    const m = yyyymmdd.substr(4, 2) - 1;
    const d = yyyymmdd.substr(6, 2);
    const newDate = new Date(y, m, d);

    return value.match(dateRegex) && formatDateToString(newDate) === yyyymmdd;
};

export const validateAmount = (value) => Number(value) > 0;

export const validateContent = (value) => value && value.length < CONTENT_MAX_LENGTH;

export const validatePaymentMethod = (value) => value && paymentMethods.getPaymentMethodById(value);

export const validateIsIncome = (value) => value !== null;

export const validateCategory = (value) => value;

export const validateHistoryForm = (historyFormInputs) => {
    const validateMap = {
        date: validateDate,
        content: validateContent,
        paymentMethod: validatePaymentMethod,
        amount: validateAmount,
        isIncome: validateIsIncome,
        category: validateCategory,
    };

    return Object.entries(historyFormInputs).every(([key, value]) =>
        validateMap[key] ? validateMap[key](value) : true,
    );
};
