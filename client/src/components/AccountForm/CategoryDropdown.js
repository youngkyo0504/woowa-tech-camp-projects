import { div, span } from "@core/CreateDom";
import { downArrowIcon } from "@icons";
import categories from "@store/categories";
import { validateEvent } from "./customEvent";

const CategoryDropdownPanel = ({ state, ref }) => {
    const categoryIds = categories.filterCategoryIds(state.isIncome);

    const panelItem = (categoryId) => {
        const setCategory = (e) => {
            e.stopPropagation();
            ref.category = categoryId;
            state.isCategoryClick = false;
            e.currentTarget.dispatchEvent(validateEvent);
        };

        const category = categories.getCategoryNameById(categoryId);

        return div({ class: "panelItemContainer" })(
            div({
                class: "panelItem",
                event: { click: setCategory },
            })(span(category)),
        );
    };

    // prettier-ignore
    return div({ class: "dropdownPanel" })(
        ...categoryIds.map((categoryId) => panelItem(categoryId)));
};

const CategoryDropdown = ({ state, ref }) => {
    const categoryId = ref.category;
    const category = categories.getCategoryNameById(categoryId);

    const toggleIsClick = () => {
        state.isCategoryClick = !state.isCategoryClick;
    };

    return div({ class: "inputBox" })(
        div({ class: "inputItem category", event: { click: toggleIsClick } })(
            div({ class: "text_bold_small label", role: "label" })("분류"),
            div({ class: "text_body_regular dropdown" })(
                span({ class: `dropdownInput ${category ? "active" : ""}` })(
                    `${category ?? "선택하세요"}`,
                ),
                span({ class: "smallIcon" })(downArrowIcon()),
            ),
            state.isCategoryClick && CategoryDropdownPanel({ state, ref }),
        ),
    );
};

export default CategoryDropdown;
