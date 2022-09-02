import { div, ul, span, li } from "@core/CreateDom";
import categories from "@store/categories";
import controlDate from "@store/controlDate";
import expenditures from "@store/expenditures";
import recentSum from "@store/recentSum";
import { formatAmount, formatDate } from "@utils/format";

const StatisticTable = ({ totalExpenditure, historySumList }) => {
    const categorySumList = historySumList.map(([categoryId, sum]) => {
        const onClickCategory = () => {
            const dateString = controlDate.getFormattedDate();
            recentSum.fetchData({ category: categoryId });
            expenditures.fetchData({ category: categoryId, date: formatDate(dateString) });
        };

        const { name, color } = categories.getCategoryById(categoryId);
        const percentage = Math.round((sum / totalExpenditure) * 100) || 0;

        return li({ class: "item text_body_medium", event: { click: onClickCategory } })(
            div({
                style: `background-color: ${color}`,
                class: "itemCategory text_bold_medium",
            })(name),
            div({ class: "percentage text_body_medium " })(`${percentage}%`),
            div({ class: "totalPayment text_body_medium" })(formatAmount(sum)),
        );
    });

    return div({ class: "reportTable" })(
        div({ class: "summary text_body_large" })(
            span(`이번달 지출 금액`),
            span({ class: "totalExpenditure" })(formatAmount(totalExpenditure || "0")),
        ),
        ul(...categorySumList),
    );
};

export default StatisticTable;
