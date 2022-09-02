const PaymentMethodModel = require("../models/paymentMethod");
const {
    formatPropertyToSnake,
    formatPropertyToCamel,
    formatObjectById,
} = require("../utils/format");

module.exports = (function PaymentMethodService() {
    async function addPaymentMethod(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const id = await PaymentMethodModel.create({ data });
        return {
            ...pureData,
            id,
        };
    }

    async function getPaymentMethodAll() {
        const dbResults = await PaymentMethodModel.findAll();
        const paymentMethods = dbResults.map(formatPropertyToCamel);
        return formatObjectById(paymentMethods);
    }

    async function editPaymentMethod(id, body) {
        const data = formatPropertyToSnake(body);

        await PaymentMethodModel.updateById({ id, data });

        const paymentMethod = await PaymentMethodModel.findById({ id });
        return formatPropertyToCamel(paymentMethod);
    }

    async function deletePaymentMethod(id) {
        return await PaymentMethodModel.deleteById({ id });
    }

    return {
        addPaymentMethod,
        getPaymentMethodAll,
        editPaymentMethod,
        deletePaymentMethod,
    };
})();
