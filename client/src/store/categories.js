import { makeObservable } from "@core/Observer";
import { getAllCategories } from "@apis/categoryApi";
import loader from "@store/loader";

const state = makeObservable({
    value: {},
});

const fetchData = async () => {
    loader.state.isCategoriesLoading = true;
    const { categories } = await getAllCategories();
    state.value = categories;
    loader.state.isCategoriesLoading = false;
};

const getCategoryNameById = (id) => {
    const { value } = state;
    return id ? value[id]["name"] : undefined;
};

const getCategoryById = (id) => {
    const { value } = state;
    return value[id];
};

const filterCategoryIds = (isIncome) => {
    const selectedIds = Object.entries(state.value)
        .filter(([id, category]) => Boolean(category.isIncome) === isIncome)
        .map(([id, category]) => id);

    return selectedIds;
};

const getCategoryColorById = (id) => {
    const { value } = state;
    return id ? value[id]["color"] : undefined;
};

(async function initCategories() {
    await fetchData();
})();

export default {
    fetchData,
    state,
    getCategoryById,
    getCategoryColorById,
    getCategoryNameById,
    filterCategoryIds,
};
