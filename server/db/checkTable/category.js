const checkCategoryTable = (pool) => {
    console.log("CATEGORY TABLE CHECK...");

    return pool
        .execute(
            `
            CREATE TABLE IF NOT EXISTS category  (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(30),
                color VARCHAR(9),
                is_income BOOLEAN
            );
        `,
        )
        .then(() => {
            console.log("CATEGORY TABLE CHECKED!");
        })
        .catch(console.log);
};

module.exports = checkCategoryTable;
