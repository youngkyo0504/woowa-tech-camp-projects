import Component from "@core/Component";
import { section } from "@core/CreateDom";
import "@pages/Statistic.css";
import PaymentReport from "@components/Statistic/PaymentReport";
import StatisticExpenditure from "@components/Statistic/Expenditures";

export default class Statistic extends Component {
    render() {
        // prettier-ignore
        return section({ class: "statistic" })(
            new PaymentReport(),
            new StatisticExpenditure(),
        );
    }
}
