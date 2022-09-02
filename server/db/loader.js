const mysql = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;
const checkHistoryTable = require("./checkTable/history");
const checkPaymentMethodTable = require("./checkTable/paymentMethod");
const checkCategoryTable = require("./checkTable/category");

const pool = mysql.createPool({
    connectionLimit: 20,
    host: DB_HOST,
    port: DB_PORT || 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

(async function init() {
    await checkPaymentMethodTable(pool);
    await checkCategoryTable(pool);

    await checkHistoryTable(pool);

    console.log("ALL TABLE CHECKED!");
})();

module.exports = pool;
