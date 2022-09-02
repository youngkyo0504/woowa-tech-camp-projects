import Component from "@core/Component";
import "@pages/Calendar.css";
import { div, table, span, tr, td, footer } from "@core/CreateDom";
import { DAYS } from "@utils/date";
import controlDate from "@store/controlDate";
import histories from "@store/histories";
import { formatAmount } from "@utils/format";

export default class Calendar extends Component {
    getDatePositions(currentDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const defaultFormat = `${year}.${(month + 1).toString().padStart(2, "0")}`;

        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);

        const frontEmpties = firstDate.getDay();
        const items = lastDate.getDate();
        const lastEmpties = 7 - ((frontEmpties + items) % 7);

        const dateItems = [
            ...new Array(frontEmpties),
            ...new Array(items)
                .fill(0)
                .map((_, i) => `${defaultFormat}.${(i + 1).toString().padStart(2, "0")}`),
            ...new Array(lastEmpties),
        ];

        return dateItems;
    }
    render() {
        const dateItems = this.getDatePositions(controlDate.state.value);
        const [incomeTotal, paidTotal] = histories.getTotals() || [];
        // prettier-ignore
        return div({ class: "calendar" })(
            div({ class: "calendarHeader text_body_regular" })(
                ...DAYS.map((day) => span(day))
            ),
            table({ class: "calendarBody" })(
                ...TableLines(dateItems)
            ),
            footer({ class: "footer text_bold_medium" })(
                div({ class: "footerInfos" })(
                    span("총 수입"),
                    span(formatAmount(incomeTotal)),
                    span("총 지출"),
                    span(formatAmount(paidTotal)),
                ),
                div({ class: "footerInfos" })(
                    span("총계"),
                    span(formatAmount(incomeTotal - paidTotal)),
                ),
            ),
        );
    }
}

const TableLines = (dateItems) => {
    const dateLines = new Array(dateItems.length / 7).fill(0);
    const historiesInfos = histories.groupHistoriesByDate(histories.state.details);

    return dateLines.map((_, i) => {
        const start = i * 7;
        const end = start + 7;
        // prettier-ignore
        return tr(
            ...dateItems.slice(start, end).map((key) => {
                if (!key) {
                    return td();
                }

                const { incomeTotal, paidTotal } = historiesInfos[key] || {};
                const total = incomeTotal - paidTotal;

                return td(
                    div({ class: "tableItem" })(
                            div({ class: "incomeItem" })(formatAmount(incomeTotal)),
                            div({ class: "paidItem" })(formatAmount(-paidTotal)),
                            div({ class: "totalItem" })(formatAmount(total)),
                        div({ class: "dayItem text_bold_small" })(Number(key.slice(8))),
                    ),
                );
            }),
        );
    });
};
