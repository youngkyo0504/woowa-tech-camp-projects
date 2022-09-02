import { button, div, form, input, ul } from "@core/CreateDom";
import { addPaymentMethod } from "@apis/paymentMethodApi";
import paymentMethods from "@store/paymentMethods";
import modal from "@store/modal";

const PaymentMethodAddForm = () => {
    const submit = async (event) => {
        event.preventDefault();
        const { value } = event.target.input;
        const data = await addPaymentMethod(value);
        paymentMethods.paymentMethodsUpdate(data);
        modal.close();
    };

    return form({ class: "modal text_body_medium ", event: { submit } })(
        div({ class: "info" })("추가하실 결제수단을 적어주세요."),
        input({ id: "input", class: "modalInput text_body_medium", placeholder: "입력하세요" })(),
        ul({ class: "modalBtnWrapper" })(
            button({
                type: "button",
                class: "text_body_medium modalBtn ",
                event: { click: modal.close },
            })("취소"),
            button({ class: "modalBtn text_body_medium primary" })("등록"),
        ),
    );
};

export default PaymentMethodAddForm;
