import Component from "@core/Component";
import "@pages/Account.css";
import { div } from "@core/CreateDom";
import AccountForm from "@src/components/AccountForm";
import Modal from "@components/Modal";
import History from "@components/History";

export default class Account extends Component {
    render() {
        // prettier-ignore
        return div({ class: "account" })(
                new AccountForm(),
                new Modal(),
                new History(),
        );
    }
}
