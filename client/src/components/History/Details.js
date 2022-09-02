import Component from "@core/Component";
import "@components/History/Details.css";
import { div, h4, lh, li, span, ul } from "@core/CreateDom";
import histories from "@store/histories";
import { getLocaleDate } from "@utils/date";
import { formatAmount } from "@utils/format";
import categories from "@store/categories";
import paymentMethods from "@store/paymentMethods";

export default class HistoryDetails extends Component {
    render() {
        const { filteredHistories, showTotal } = this.props;
        const groupedHistories = histories.groupHistoriesByDate(filteredHistories);
        const dates = Object.keys(groupedHistories).sort().reverse();

        const Details = dates.reduce((doms, date) => {
            const { histories: details, incomeTotal, paidTotal } = groupedHistories[date];
            doms.push(HistoryInfo({ date, incomeTotal, paidTotal, showTotal }));
            doms.push(...details.map((detail) => HistoryItem(detail, showTotal)));
            return doms;
        }, []);
        // prettier-ignore
        return ul({ class: "historyDetail" })(
            ...Details
        );
    }
}

const HistoryInfo = ({ date, incomeTotal, paidTotal, showTotal }) => {
    const showIncome = showTotal && incomeTotal ? undefined : false;
    const showPaid = showTotal && paidTotal ? undefined : false;

    const [localDate, day] = getLocaleDate(date);
    // prettier-ignore
    return lh({ class: "info text_bold_medium" })(
        h4(
            span({ class: "infoLocaleDate" })(localDate),
            span({ class: "infoDay" })(day),
        ),
        div({ class: "totals" })(
            showIncome ?? span("수입"),
            showIncome ?? span(formatAmount(incomeTotal)),
            showPaid ?? span("지출"),
            showPaid ?? span(formatAmount(paidTotal)),
        ),
    );
};

const HistoryItem = (
    { id, category: categoryId, content, paymentMethod: paymentMethodId, amount, isIncome },
    showTotal,
) => {
    const { name: categoryName, color: categoryColor } = categories.state.value[categoryId] ?? {};
    const { name: paymentMethodName } = paymentMethods.state.value[paymentMethodId] ?? {};

    // prettier-ignore
    return li({ class: `item text_body_medium${showTotal ? " itemHoverAble" : ""}`, "data-id": id })(
        div({
            style: `background-color: ${categoryColor}`,
            class: "itemCategory text_bold_medium",
        })(categoryName),
        div({ class: "itemContent" })(content),
        div({ class: "itemPaymentMethod" })(paymentMethodName),
        div({ class: "itemAmount" })(`${(isIncome ? "" : "-")}${formatAmount(amount)}원`),
    );
};
