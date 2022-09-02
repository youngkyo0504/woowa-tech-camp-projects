import "@components/AccountForm/index.css";
import Component from "@core/Component";
import { button, form } from "@core/CreateDom";
import { checkIcon } from "@icons";
import FormInput from "./FormInput";
import CategoryDropdown from "./CategoryDropdown";
import PaymentDropdown from "./paymentDropdown";
import AmountInput from "./AmountInput";
import { validateHistoryForm } from "./validation";
import selectedHistory from "@store/selectedHistory";
import { compareObjects } from "@utils/compareObject";
import categories from "@store/categories";
import paymentMethods from "@store/paymentMethods";
import request from "@utils/request";
import controlDate from "@store/controlDate";
import { formatDate } from "@utils/format";
import histories from "@store/histories";

const ACTIVE_COLOR = "white";
const PRIMARY_COLOR = "#2ac1bc";

export default class AccountForm extends Component {
    initState() {
        return {
            isCategoryClick: false,
            isPaymentClick: false,
            isIncome: false,
        };
    }

    bindState() {
        return [selectedHistory.state, categories.state, paymentMethods.state];
    }

    initRef() {
        return {
            isAllValid: false,
            date: controlDate.getFormattedDate(),
            content: null,
            paymentMethod: null,
            category: null,
            id: null,
            amount: null,
        };
    }

    resetRef() {
        this.ref = this.initRef();
    }

    toggleActiveSubmitBtn(isAllValid) {
        this.ref.isAllValid = isAllValid;
        const saveBtn = document.querySelector(".saveButton");
        saveBtn.classList.toggle("active", isAllValid);
        saveBtn.querySelector("svg").style.stroke = isAllValid ? ACTIVE_COLOR : PRIMARY_COLOR;
    }

    validateAll() {
        const innerInputValues = { ...this.ref, isIncome: this.state.isIncome };
        const isNotChanged = compareObjects(innerInputValues, selectedHistory.state);

        const { id: stateId } = selectedHistory.state;
        if (stateId && isNotChanged) {
            return this.toggleActiveSubmitBtn(false);
        }

        const isAllValid = validateHistoryForm(innerInputValues);
        this.toggleActiveSubmitBtn(isAllValid);
    }

    synchronize() {
        if (selectedHistory.state.isIncome !== null) {
            this.state.isIncome = Boolean(selectedHistory.state.isIncome);
        }
        Object.keys(this.ref).forEach((key) => {
            if (key in selectedHistory.state) {
                this.ref[key] = selectedHistory.state[key];
            }
        });
    }
    async submit(e) {
        e.preventDefault();

        if (!this.ref.isAllValid) {
            return;
        }

        const historyId = selectedHistory.state.id;
        const isEditRequest = historyId !== null;

        // 후에 다른 api로 수정

        const { date, content, paymentMethod, category, amount } = this.ref;
        const { isIncome } = this.state;
        const data = { date, content, paymentMethod, category, amount, isIncome };

        const url = `/history/${isEditRequest ? historyId : ""}`;
        const apiMethod = isEditRequest ? "patch" : "post";
        const newHistory = await request[apiMethod]({ url, body: data });

        histories.historiesUpdate(newHistory);
        this.resetRef();
        selectedHistory.resetHistoryState();
    }

    render() {
        const { ref, state } = this;

        if (selectedHistory.state.isChanged) {
            this.synchronize();
            this.validateAll();
            selectedHistory.state.isChanged = false;
        }

        // prettier-ignore
        return form({
                class: "accountForm",
                event: { 
                    validate: this.validateAll.bind(this),
                    submit: this.submit.bind(this)
                },
            })(
            FormInput({
                ref,
                key:"date",
                placeholder: "2022.07.01",
                labelText : "일자",
                maxLength: 10,
                format:formatDate
            }),
            CategoryDropdown({ ref, state }),
            FormInput({
                ref,
                key:"content",
                placeholder: "입력하세요",
                labelText : "내용",
            }),
            PaymentDropdown({ ref, state }),
            AmountInput({ ref,state }),
            button({
                class:`saveButton ${this.ref.isAllValid && "active"}`,
            })(
                checkIcon(this.ref.isAllValid ? ACTIVE_COLOR : PRIMARY_COLOR)
            )
        );
    }
}
