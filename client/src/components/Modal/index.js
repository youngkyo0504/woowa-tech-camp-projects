import "./modal.css";
import Component from "@core/Component";
import { div } from "@core/CreateDom";
import modal from "@store/modal";
import PaymentMethodDeleteForm from "./PaymentMethodDeleteForm";
import PaymentMethodAddForm from "./PaymentMethodAddForm";

const modalMap = {
    delete: PaymentMethodDeleteForm,
    add: PaymentMethodAddForm,
};

export default class Modal extends Component {
    bindState() {
        return [modal.state];
    }

    render() {
        const { value, type } = modal.state;

        if (!type) {
            return div();
        }

        return div({ class: "modalContainer" })(
            div({ class: "blackScreen" })(),
            div({ class: "modalWrapper" })(modalMap[type](value)),
        );
    }
}
