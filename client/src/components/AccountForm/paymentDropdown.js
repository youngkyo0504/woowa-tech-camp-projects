import { div, button, span } from "@core/CreateDom";
import { xIcon, downArrowIcon } from "@icons";
import modal from "@store/modal";
import paymentMethods from "@store/paymentMethods";
import { validateEvent } from "./customEvent";

const PaymentDropdownPanel = ({ state, ref }) => {
    const paymentMethodIds = paymentMethods.getPaymentMethodIds();

    const panelItem = (paymentMethodId) => {
        const paymentMethod = paymentMethods.getPaymentMethodById(paymentMethodId);

        const setPaymentMethod = (e) => {
            e.stopPropagation();
            ref.paymentMethod = paymentMethodId;
            state.isPaymentMethodClick = false;
            e.currentTarget.dispatchEvent(validateEvent);
        };

        return div({ class: "panelItemContainer" })(
            div({
                class: "panelItem",
                event: { click: setPaymentMethod },
            })(
                span(paymentMethod),
                span({ event: { click: modal.open("delete", paymentMethodId) } })(xIcon()),
            ),
        );
    };

    return div({ class: "dropdownPanel" })(
        ...paymentMethodIds.map((paymentMethodId) => panelItem(paymentMethodId)),
        div({ class: "panelItemContainer" })(
            button({ event: { click: modal.open("add") }, class: "panelItem" })("추가하기"),
        ),
    );
};

const PaymentDropdown = ({ state, ref }) => {
    const paymentMethod = paymentMethods.getPaymentMethodById(ref.paymentMethod);
    const toggleIsClick = ({ currentTarget }) => {
        state.isPaymentMethodClick = !state.isPaymentMethodClick;
    };

    return div({ class: "inputBox payment" })(
        div({ class: "inputItem paymentMethod", event: { click: toggleIsClick } })(
            div({ class: "text_bold_small label", role: "label" })("결제수단"),
            div({ class: `text_body_regular dropdown` })(
                span({ class: `dropdownInput  ${paymentMethod ? "active" : ""}` })(
                    `${paymentMethod ?? "선택하세요"}`,
                ),
                span({ class: "smallIcon" })(downArrowIcon()),
            ),
            state.isPaymentMethodClick && PaymentDropdownPanel({ state, ref }),
        ),
    );
};

export default PaymentDropdown;
