const pool = require("../db/loader");
const {
    getCreateQuery,
    getReadByIdQuery,
    getUpdateQuery,
    getDeleteQuery,
} = require("../utils/query");
const createError = require("http-errors");
const { DB_NO_AFFECT_ERROR } = require("../utils/errorMessages");

module.exports = (function HistoryModel() {
    const TABLE_NAME = "history";
    const COLUMNS = ["id", "date", "is_income", "category", "content", "payment_method", "amount"];
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

    async function findByRange({ startDate, endDate }) {
        const query = `
            SELECT *, CONCAT(
                YEAR(date), '.', LPAD(MONTH(date), 2, '0'), '.', LPAD(DAY(date), 2, '0')
            ) AS date
            FROM ${TABLE_NAME}
            WHERE '${startDate}' <= date AND date < '${endDate}'
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }
    async function findByRangeAndCategory({ startDate, endDate, categoryId }) {
        const query = `
            SELECT *, CONCAT(
                YEAR(date), '.', LPAD(MONTH(date), 2, '0'), '.', LPAD(DAY(date), 2, '0')
            ) AS date
            FROM ${TABLE_NAME}
            WHERE category = ${categoryId} AND
                '${startDate}' <= date AND date < '${endDate}'
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

    async function sumAmountsByMonth({ categoryId, startDate, endDate }) {
        const DATE_FORMAT = `
            CONCAT(
                YEAR(h.date), '.', LPAD(MONTH(h.date), 2, '0')
            )
        `;
        const query = `
            SELECT ${DATE_FORMAT} AS 'date',
                CAST(SUM (amount) AS UNSIGNED) AS 'total'
            FROM ${TABLE_NAME} AS h
                INNER JOIN category AS c
                ON h.category = c.id
            WHERE h.category = ${categoryId} AND 
                '${startDate}' <= date AND date < '${endDate}'
            GROUP BY ${DATE_FORMAT}
            ORDER BY ${DATE_FORMAT}
        `;

        const [sums] = await pool.execute(query);
        return sums;
    }

    return {
        create,
        findById,
        findByRange,
        findByRangeAndCategory,
        updateById,
        deleteById,
        sumAmountsByMonth,
    };
})();
