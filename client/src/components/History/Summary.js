import Component from "@core/Component";
import "@components/History/Summary.css";
import { button, div, h3, section, span } from "@core/CreateDom";
import histories from "@store/histories";
import checkIcon from "@icons/check";
import { formatAmount } from "@utils/format";

const WHITE = "#ffffff";
const TRANSPARENT = "transparent";

export default class HistorySummary extends Component {
    render() {
        const { filteredHistories, isIncomeSelected, isPaidSelected, toggleIsSelected } =
            this.props;
        const [incomeTotal, paidTotal] = histories.getTotals();

        const incomeButtonClass = isIncomeSelected ? "activeButton" : "";
        const incomeAmountClass = isIncomeSelected ? "" : "inactiveAmount";
        const incomeIconColor = isIncomeSelected ? WHITE : TRANSPARENT;
        const paidButtonClass = isPaidSelected ? "activeButton" : "";
        const paidAmountClass = isPaidSelected ? "" : "inactiveAmount";
        const paidIconColor = isPaidSelected ? WHITE : TRANSPARENT;

        // prettier-ignore
        return div({ class: "historySummary" })(
            h3({ class: "text_body_large" })(
                `전체 내역 ${formatAmount(filteredHistories?.length) || 0}건`
            ),
            section({
                class: "controller text_body_medium",
                event: { click: toggleIsSelected },
            })(
                button({
                    id: "incomeToggle",
                    class: `toggleButton ${incomeButtonClass}`,
                })(
                    checkIcon(incomeIconColor, 16, 16)
                ),
                span({ class: incomeAmountClass })(`수입 ${formatAmount(incomeTotal) || "0"}`),
                button({
                    id: "paidToggle",
                    class: `toggleButton ${paidButtonClass}`,
                })(
                    checkIcon(paidIconColor, 16, 16)
                ),
                span({ class: paidAmountClass })(`지출 ${formatAmount(paidTotal) || "0"}`),
            )
        );
    }
}
