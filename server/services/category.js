const CategoryModel = require("../models/category");
const {
    formatPropertyToSnake,
    formatPropertyToCamel,
    formatObjectById,
} = require("../utils/format");

module.exports = (function CategoryService() {
    async function addCategory(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const id = await CategoryModel.create({ data });
        return {
            ...pureData,
            id,
        };
    }

    async function getCategoryAll() {
        const dbResults = await CategoryModel.findAll();
        const categories = dbResults.map(formatPropertyToCamel);
        return formatObjectById(categories);
    }

    async function editCategory(id, body) {
        const data = formatPropertyToSnake(body);

        await CategoryModel.updateById({ id, data });

        const category = await CategoryModel.findById({ id });
        return formatPropertyToCamel(category);
    }

    async function deleteCategory(id) {
        return await CategoryModel.deleteById({ id });
    }

    return {
        addCategory,
        getCategoryAll,
        editCategory,
        deleteCategory,
    };
})();
