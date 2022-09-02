import { deletePaymentMethod } from "@apis/paymentMethodApi";
import { button, div, form, ul } from "@core/CreateDom";

import modal from "@store/modal";
import paymentMethods from "@store/paymentMethods";

const PaymentMethodDeleteForm = (id) => {
    const paymentMethodValue = paymentMethods.getPaymentMethodById(id);

    const submit = async (event) => {
        event.preventDefault();
        await deletePaymentMethod(id);
        paymentMethods.paymentMethodsDelete(id);
        modal.close();
    };

    return form({ class: "modal text_body_medium ", event: { submit } })(
        div({ class: "info" })("해당 결제수단을 삭제하시겠습니까?"),
        div({ class: "modalInput text_body_medium", placeholder: "입력하세요" })(
            paymentMethodValue,
        ),
        ul({ class: "modalBtnWrapper" })(
            button({
                type: "button",
                class: "text_body_medium modalBtn ",
                event: { click: modal.close },
            })("취소"),
            button({ class: "modalBtn text_body_medium error" })("삭제"),
        ),
    );
};

export default PaymentMethodDeleteForm;
