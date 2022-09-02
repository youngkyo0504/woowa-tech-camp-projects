const pool = require("../db/loader");
const {
    getCreateQuery,
    getReadByIdQuery,
    getUpdateQuery,
    getDeleteQuery,
} = require("../utils/query");
const createError = require("http-errors");
const { DB_NO_AFFECT_ERROR } = require("../utils/errorMessages");

module.exports = (function CategoryModel() {
    const TABLE_NAME = "category";
    const COLUMNS = ["id", "name", "color", "is_income"];
    const TABLE_INFO = {
        tableName: TABLE_NAME,
        columns: COLUMNS,
    };

    async function create({ data }) {
        const query = getCreateQuery(TABLE_INFO, data);
        const [fields] = await pool.execute(query);
        return fields.insertId;
    }

    async function findById({ id }) {
        const query = getReadByIdQuery(TABLE_INFO, id);
        const [rows] = await pool.execute(query);
        return rows[0];
    }

    async function findAll() {
        const query = `
            SELECT *
            FROM ${TABLE_NAME}
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }

    async function updateById({ id, data }) {
        const query = getUpdateQuery(TABLE_INFO, id, data);
        const [fields] = await pool.execute(query);

        if (fields.affectedRows <= 0) {
            throw createError.BadRequest(DB_NO_AFFECT_ERROR);
        }

        return fields;
    }

    async function deleteById({ id }) {
        const query = getDeleteQuery(TABLE_INFO, id);
        const [fields] = await pool.execute(query);

        if (fields.affectedRows <= 0) {
            throw createError.BadRequest(DB_NO_AFFECT_ERROR);
        }

        return id;
    }

    return { create, findById, findAll, updateById, deleteById };
})();
