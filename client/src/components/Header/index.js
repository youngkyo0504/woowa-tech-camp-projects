import Component from "@core/Component";
import "@components/Header/index.css";
import { a, article, button, div, h1, h2, header, section, span } from "@core/CreateDom";
import { fileTextIcon, calendarIcon, chartIcon } from "@icons";
import downArrowIcon from "@icons/downArrow";
import Route, { pageState } from "@core/Route";
import controlDate from "@store/controlDate";

const WHITE = "#ffffff";
const PRIMARY2 = "#a0e1e0";

export default class Header extends Component {
    onClickATag(e) {
        const aElement = e.target.closest("a");
        if (aElement) {
            e.preventDefault();
            const pathname = aElement.pathname.replace("/", "");
            Route.navigate(pathname);
        }
    }
    onClickMonthMover({ target }) {
        const monthMover = target.closest(".monthMover");
        if (!monthMover) {
            return false;
        }

        const { id } = monthMover;
        if (id === "monthPrevMover") {
            controlDate.movePrev();
        }
        if (id === "monthNextMover") {
            controlDate.moveNext();
        }
    }
    render() {
        const { onClickATag, onClickMonthMover } = this;
        const currentDate = controlDate.state.value;
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const { page } = pageState;
        // prettier-ignore
        return header({ class: "header" })(
            div({
                class: "wrapper",
                event: {
                    click: onClickATag
                }})
            (
                a({ href: "/" })(h1({ class: "text_display_small" })("우아한 가계부")),
                section({
                    class: "controller",
                    event: {
                        click: onClickMonthMover
                    }
                })(
                    button({ id: "monthPrevMover", class: "monthMover" })(downArrowIcon(WHITE, 24, 24)),
                    article(
                        h2({ class: "text_display_large" })(`${month}월`),
                        span({ class: "text_display_small" })(year)
                    ),
                    button({ id: "monthNextMover", class: "monthMover" })(downArrowIcon(WHITE, 24, 24)),
                ),
                section({ class: "pageTabs" })(
                    a({ href: "/" })(fileTextIcon(page === "" ? WHITE : PRIMARY2)),
                    a({ href: "/calendar" })(calendarIcon(page === "calendar" ? WHITE : PRIMARY2)),
                    a({ href: "/statistic" })(chartIcon(page === "statistic" ? WHITE : PRIMARY2)),
                ),
            ),
        );
    }
}
