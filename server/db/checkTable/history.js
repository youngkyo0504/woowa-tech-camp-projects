const checkHistoryTable = (pool) => {
    console.log("HISTORY TABLE CHECK...");

    return pool
        .execute(
            `
            CREATE TABLE IF NOT EXISTS history  (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATE,
                is_income BOOLEAN,
                category INT,
                payment_method INT,  
                content VARCHAR(150),
                amount INT,
                FOREIGN KEY(payment_method) REFERENCES payment_method(id),
                FOREIGN KEY(category) REFERENCES category(id)
            );
        `,
        )
        .then(() => {
            console.log("HISTORY TABLE CHECKED!");
        })
        .catch(console.log);
};

module.exports = checkHistoryTable;
