import Component from "@core/Component";
import { div } from "@core/CreateDom";
import "@components/Statistic/Expenditures/index.css";
import recentSum from "@store/recentSum";
import LineChart from "@components/Statistic/LineChart";
import HistoryDetails from "@components/History/Details";
import expenditures from "@store/expenditures";

export default class StatisticExpenditure extends Component {
    bindState() {
        return [recentSum.state, expenditures.state];
    }

    render() {
        const { isLoading: isLoadingRecentSum } = recentSum.state;
        const { isLoading: isLoadingExpenditure, value: histories } = expenditures.state;

        if (isLoadingRecentSum || isLoadingExpenditure) {
            return div();
        }

        // prettier-ignore
        return div({ class: "statisticExpenditure" })(
            div({ class: "lineChart" })(
                new LineChart(),
            ),
            div({ class: "details" })(
                new HistoryDetails({
                    filteredHistories: histories,
                    showTotal: false
                }),
            )
        );
    }
}
